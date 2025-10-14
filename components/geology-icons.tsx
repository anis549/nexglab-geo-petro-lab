import type React from "react"

// Icône de flacon d'acide HCl
export function AcidBottleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.5 3h7v3h-7z" />
      <path d="M6 6h12l-1.5 15h-9L6 6z" />
      <path d="M5 21h14" />
      <path d="M11 9c.86 2.57 2.57 4.29 5 5" />
      <path d="M9 11c.86 1.71 1.71 2.86 3 3.5" />
      <path d="M8 13c.86.86 1.71 1.71 3 2" />
    </svg>
  )
}

// Icône de marteau de géologue
export function GeologistHammerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15L22 10.64" />
      <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
    </svg>
  )
}

// Icône de loupe géologique
export function MagnifierIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  )
}

// Icône de fossile
export function FossilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12h.01" />
      <path d="M7 12h10" />
      <path d="M21 12h.01" />
      <path d="M12 17a5 5 0 0 0 5-5" />
      <path d="M12 17a5 5 0 0 1-5-5" />
      <path d="M12 17v.01" />
      <path d="M3 8h18" />
      <path d="M3 16h18" />
      <path d="M8 16v4" />
      <path d="M16 16v4" />
      <path d="M8 4v4" />
      <path d="M16 4v4" />
    </svg>
  )
}

// Icône de granulométrie/texture
export function GrainTextureIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 8v8" />
      <path d="M8 6h8" />
      <path d="M8 18h8" />
      <path d="M18 8v8" />
    </svg>
  )
}

// Icône de stratification
export function StratificationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 6H3" />
      <path d="M21 10H3" />
      <path d="M21 14H3" />
      <path d="M21 18H3" />
    </svg>
  )
}

// Icône de classification
export function ClassificationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="M7 16h2" />
      <path d="M11 12h2" />
      <path d="M15 8h2" />
      <path d="M19 4h2" />
    </svg>
  )
}

// Icône de roche
export function RockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 8c1.4 0 2.8-.3 4-.9l.4-.2c.4-.2.6-.6.6-1 0-.5-.3-.9-.8-1.1l-2.2-.7c-1.3-.4-2.6-.6-4-.6-3.7 0-7 1.5-9.2 4l-1.5 1.9c-.3.4-.2.9.2 1.2L8 13l2 3h4l2-4 2-4z" />
      <path d="M6.3 17.7c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l5.3-5.3-1.4-1.4-5.3 5.3z" />
    </svg>
  )
}
