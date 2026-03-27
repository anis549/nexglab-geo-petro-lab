# Data Integrity Bug Fix - Technical Documentation

## Problem Analysis

### Root Cause
The application had a critical data integrity bug where `experimentResults` (user-generated, untrusted data) could override and break the correct `rockSamples` data (static, trusted source).

**Specific Issues:**
1. **No Validation**: Experiment results were used directly without checking if values were valid
2. **Undefined Spreading**: Invalid values (undefined, null, empty strings) were being displayed to users
3. **Multiple Validations**: Each cell recalculated validation, causing performance issues
4. **No Fallback Logic**: The component had no way to fall back to rock data when experiment data was broken

### Impact
Users would see broken UI displaying:
- `hardness: undefined (Mohs)`
- `texture: undefined`
- `fossil: null`
- `acid: ""` (empty)

This occurred even though `rockSamples` always had correct values.

---

## Solution Architecture

### 1. **Centralized Validation Layer** (`utils/safe-rock-data.ts`)

**Purpose**: Single source of truth for validation logic, preventing scattered validation code across components.

**Key Features:**
- **Strict Validation Functions**: Each property has its own validator
  - `validateHardness()`: Ensures number 1-10
  - `validateAcidReaction()`: Only accepts valid French labels
  - `validateTexture()`: "Rugueuse" | "Lisse"
  - `validateFossils()`: "Présents" | "Absents"
  - `validateGranulometry()`: Non-empty string

- **Validation Schemas**: Defined as constants
  ```typescript
  const VALID_ACID_REACTIONS = new Set([
    "Forte effervescence",
    "Faible effervescence",
    "Aucune réaction",
  ])
  ```

- **Data Transformation**: Converts internal formats to display formats
  - `rockSample.acidReaction` ("strong" → "Forte effervescence")
  - `rockSample.hasFossils` (boolean → "Présents"/"Absents")

### 2. **Safe Merge Algorithm** (`getSafeRockData()`)

**Core Logic:**

```
For each property (hardness, acid, texture, fossil, granulometry):
  1. Get latest experiment result for this property
  2. Validate it strictly
  3. If VALID → USE IT
  4. If INVALID/NULL → FALL BACK TO rockSample (always valid)
  5. RETURN validated value (never undefined/null)
```

**Pseudocode:**
```typescript
getSafeRockData(rock, experimentResults) {
  return {
    hardness: getLatestValidExperimentData(...) ?? rock.hardness,
    acid: getLatestValidExperimentData(...) ?? rock.acid,
    texture: getLatestValidExperimentData(...) ?? rock.texture,
    fossil: getLatestValidExperimentData(...) ?? rock.fossils,
    granulometry: getLatestValidExperimentData(...) ?? rock.grainSize,
  }
}
```

### 3. **Performance Optimization** (Classification Table)

**Problem**: Multiple calls to validation per cell = wasted computation

**Solution**: Cache safe data once per row using `useMemo`
```typescript
const rowDataCache = useMemo(() => {
  filteredRocks.forEach((rock) => {
    // SINGLE call per rock, not per cell
    const safeData = getSafeRockData(rock, experimentResults)
    cache[rock.id] = formatRockDataForDisplay(safeData)
  })
  return cache
}, [filteredRocks, experimentResults])
```

**Benefit:** Reduces `getSafeRockData()` calls from 6 (per row) × N (rows) to N calls total.

### 4. **Safe Display Formatting**

**Before:**
```typescript
function getCellValue(rockId, type, rock) {
  // Multiple parameters needed
  // Complex fallback logic scattered in each cell
  return experimentValue ?? rockData
}
```

**After:**
```typescript
function getCellValue(rockId, fieldName) {
  // Single cache lookup
  // Already formatted and guaranteed safe
  return rowDataCache[rockId]?.[fieldName] ?? "—"
}
```

---

## How It Prevents Bugs Permanently

### 1. **Validation Strictness**
Any invalid experiment result is rejected at the validation layer, preventing broken data from reaching the UI:
```typescript
validateHardness(undefined)  // → null
validateHardness("abc")      // → null
validateAcidReaction("foo")  // → null
```

### 2. **Automatic Fallback**
If any experiment data is invalid, the system automatically uses the trusted rock data:
```typescript
hardness: validatedExperimentHardness ?? rock.hardness
// If validatedExperimentHardness is null, rock.hardness is used
```

### 3. **Guaranteed Non-Null Output**
The display formatting ensures no undefined values reach the UI:
```typescript
hardness: data.hardness !== null ? `${data.hardness} (Mohs)` : "—"
// Always returns either "X (Mohs)" or "—", never undefined
```

### 4. **Single Source for Validation Rules**
All validation logic is in one file. Changes to validation don't scatter across components:
```
safe-rock-data.ts ← All validation rules defined here
  ↓
  Classification Table ← Uses validated data only
  ↓
  Other components ← Can reuse same logic
```

### 5. **Type Safety**
TypeScript ensures properties are used correctly:
```typescript
type RockDataTransformed = {
  hardness: number | null
  acid: string | null
  texture: string | null
  fossil: string | null
  granulometry: string | null
}
```

---

## Files Changed

### 1. **Created: `utils/safe-rock-data.ts`** (330 lines)
- Validates all rock properties
- Merges experiment data with rock fallback
- Transforms data for display
- Exported functions for reuse

### 2. **Updated: `components/classification-table.tsx`** (110 lines)
- Removed inline validation (`getValidatedLatestResult()`)
- Removed inline fallback logic (`getCellValue()`)
- Now uses `getSafeRockData()` and `formatRockDataForDisplay()`
- Added performance caching in `rowDataCache`
- Cleaner, more maintainable code

---

## Usage Examples

### Example 1: Using Safe Rock Data
```typescript
import { getSafeRockData } from "@/utils/safe-rock-data"

const safeData = getSafeRockData(rock, experimentResults)
// Returns:
// {
//   hardness: 7 | null,
//   acid: "Forte effervescence" | null,
//   texture: "Rugueuse" | null,
//   fossil: "Présents" | null,
//   granulometry: "sand" | null,
// }
```

### Example 2: Getting Formatted Display
```typescript
import { getSafeRockData, formatRockDataForDisplay } from "@/utils/safe-rock-data"

const safeData = getSafeRockData(rock, experimentResults)
const display = formatRockDataForDisplay(safeData)
// Returns:
// {
//   hardness: "7 (Mohs)" or "—",
//   acid: "Forte effervescence" or "—",
//   texture: "Rugueuse" or "—",
//   fossil: "Présents" or "—",
//   granulometry: "sand" or "—",
// }
```

### Example 3: Getting Single Field
```typescript
import { getSafeRockFieldValue } from "@/utils/safe-rock-data"

const hardness = getSafeRockFieldValue(rock, "hardness", experimentResults)
// Returns: 7 | null (validated value)
```

---

## Testing Scenarios Prevented

| Scenario | Before | After |
|----------|--------|-------|
| Undefined experiment | "undefined (Mohs)" | "7 (Mohs)" (falls back) |
| Null acid value | Shows "null" | Falls back to rock data |
| Invalid hardness "abc" | Tries to display | Rejected, uses rock data |
| Empty string | Shows "" | Shows "—" (dash) |
| Valid experiment | Shows it | Uses it (correct) |
| No experiments | May break | Uses rock data (safe) |

---

## Performance Impact

### Before
- Classification Table with 8 rocks, 5 properties = 40 validation calls per render
- Each call searches and filters experiment results

### After
- 8 validation calls total (one per rock)
- Results cached in `rowDataCache` memo
- Recomputes only when `filteredRocks` or `experimentResults` changes

**Improvement**: ~5x fewer validation calls + memoization

---

## Future-Proofing

To add new properties or validation rules in the future:

1. **Add validation function** in `safe-rock-data.ts`
   ```typescript
   function validateNewProperty(value: any): string | null {
     // validation logic
     return value ?? null
   }
   ```

2. **Update transformation** in `transformRockSample()`
   ```typescript
   newProperty: validateNewProperty(rock.newProperty)
   ```

3. **Update merge** in `getSafeRockData()`
   ```typescript
   newProperty: getLatestValidExperimentData(...) ?? rockData.newProperty
   ```

4. **Update display** in `formatRockDataForDisplay()`
   ```typescript
   newProperty: data.newProperty ?? "—"
   ```

All changes localized to one file. No scattered changes across components.

---

## Conclusion

This fix implements a **defensive data layer** that:
- ✅ Never displays broken data
- ✅ Always has a fallback (rockSamples)
- ✅ Validates strictly at boundaries
- ✅ Optimizes performance with caching
- ✅ Centralizes validation logic
- ✅ Makes the app more maintainable and testable

The application is now protected against invalid experiment data, and users will always see correct rock properties or "—" if data is truly missing.
