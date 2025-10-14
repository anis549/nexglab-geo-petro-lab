export default function StrataPattern({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ opacity }}
    >
      <defs>
        <pattern id="strata-pattern" patternUnits="userSpaceOnUse" width="100" height="20" patternTransform="rotate(0)">
          <line x1="0" y1="0" x2="100" y2="0" stroke="#8B5E3C" strokeWidth="0.5" />
          <line x1="0" y1="10" x2="100" y2="10" stroke="#8B5E3C" strokeWidth="0.2" strokeDasharray="5,3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#strata-pattern)" />
    </svg>
  )
}
