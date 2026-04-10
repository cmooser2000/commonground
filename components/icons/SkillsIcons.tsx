// Skills Icons

export function RepairWrenchIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Wrench body */}
      <path d="M14 50 L38 20" stroke="#FAF3E0" strokeWidth="5" strokeLinecap="round"/>
      {/* Wrench open end - top */}
      <circle cx="40" cy="17" r="8" fill="none" stroke="#FAF3E0" strokeWidth="4"/>
      <rect x="36" y="12" width="8" height="5" rx="1" fill={bgColor}/>
      {/* Wrench closed end - bottom */}
      <rect x="10" y="47" width="9" height="8" rx="3" fill="#FAF3E0"/>
      {/* Sparkle / star - indicating skill */}
      <path d="M52 38 L54 44 L60 44 L55 48 L57 54 L52 50 L47 54 L49 48 L44 44 L50 44 Z" fill="#E8B84B"/>
    </svg>
  );
}

export function PaintbrushIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Handle */}
      <rect x="27" y="8" width="8" height="32" rx="4" fill="#FAF3E0"/>
      {/* Metal ferrule */}
      <rect x="26" y="36" width="12" height="6" rx="1" fill="#3D3D3D"/>
      {/* Bristles */}
      <path d="M26 42 Q28 56 32 58 Q36 56 38 42 Z" fill="#E8B84B"/>
      {/* Brush tip */}
      <ellipse cx="32" cy="56" rx="4" ry="2" fill="#C1502E"/>
      {/* Paint swatch blobs */}
      <circle cx="14" cy="20" r="6" fill="#7D9B76" opacity="0.8"/>
      <circle cx="50" cy="16" r="5" fill="#6B8FA3" opacity="0.8"/>
      <circle cx="18" cy="44" r="4" fill="#E8B84B" opacity="0.8"/>
      <circle cx="48" cy="42" r="5" fill="#FAF3E0" opacity="0.6"/>
    </svg>
  );
}

export function SeedlingIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Stem */}
      <path d="M32 54 Q32 36 32 28" stroke="#7D9B76" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Left leaf */}
      <path d="M32 36 Q20 30 16 20 Q26 20 32 32 Z" fill="#7D9B76"/>
      {/* Right leaf */}
      <path d="M32 30 Q44 24 48 14 Q38 16 32 28 Z" fill="#7D9B76"/>
      {/* Small top leaves */}
      <path d="M32 22 Q26 16 24 10 Q30 12 32 22 Z" fill="#E8B84B"/>
      <path d="M32 22 Q38 16 40 10 Q34 12 32 22 Z" fill="#E8B84B"/>
      {/* Soil mound */}
      <ellipse cx="32" cy="54" rx="14" ry="5" fill="#3D3D3D"/>
      {/* Pot */}
      <path d="M20 54 L22 62 L42 62 L44 54 Z" fill="#E8B84B"/>
      <rect x="18" y="52" width="28" height="4" rx="2" fill="#C1502E"/>
    </svg>
  );
}

export function LaptopHelpIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Laptop base */}
      <rect x="8" y="42" width="48" height="6" rx="3" fill="#3D3D3D"/>
      {/* Laptop screen body */}
      <rect x="12" y="16" width="40" height="28" rx="4" fill="#3D3D3D"/>
      {/* Screen */}
      <rect x="15" y="19" width="34" height="22" rx="2" fill="#FAF3E0"/>
      {/* Question mark on screen */}
      <text x="26" y="36" fontSize="18" fontFamily="Arial" fontWeight="bold" fill="#6B8FA3">?</text>
      {/* Hinge */}
      <rect x="10" y="42" width="44" height="3" rx="1.5" fill="#FAF3E0" opacity="0.3"/>
      {/* Keyboard indicator */}
      <rect x="16" y="44" width="32" height="2" rx="1" fill="#FAF3E0" opacity="0.2"/>
      {/* Help bubble */}
      <circle cx="48" cy="14" r="9" fill="#E8B84B"/>
      <text x="44" y="19" fontSize="12" fontFamily="Arial" fontWeight="bold" fill="#3D3D3D">!</text>
    </svg>
  );
}

export function CarIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Car body */}
      <rect x="6" y="34" width="52" height="16" rx="5" fill="#FAF3E0"/>
      {/* Car roof cabin */}
      <path d="M16 34 L20 20 L44 20 L48 34 Z" fill="#FAF3E0"/>
      {/* Windows */}
      <path d="M22 34 L24 22 L38 22 L40 34 Z" fill="#6B8FA3" opacity="0.7"/>
      {/* Window divider */}
      <line x1="31" y1="22" x2="31" y2="34" stroke="#FAF3E0" strokeWidth="1.5"/>
      {/* Front headlight */}
      <rect x="6" y="36" width="8" height="6" rx="2" fill="#E8B84B"/>
      {/* Rear taillight */}
      <rect x="50" y="36" width="8" height="6" rx="2" fill="#C1502E"/>
      {/* Wheels */}
      <circle cx="18" cy="52" r="8" fill="#3D3D3D"/>
      <circle cx="18" cy="52" r="4" fill="#FAF3E0"/>
      <circle cx="18" cy="52" r="2" fill="#3D3D3D"/>
      <circle cx="46" cy="52" r="8" fill="#3D3D3D"/>
      <circle cx="46" cy="52" r="4" fill="#FAF3E0"/>
      <circle cx="46" cy="52" r="2" fill="#3D3D3D"/>
      {/* Wrench overlay - skill indicator */}
      <path d="M38 10 L46 8 L44 12 Z" fill="#E8B84B"/>
      <circle cx="44" cy="10" r="3" fill="none" stroke="#E8B84B" strokeWidth="2"/>
    </svg>
  );
}

export function NeedleThreadIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Thread spool */}
      <ellipse cx="20" cy="44" rx="12" ry="6" fill="#E8B84B"/>
      <rect x="8" y="36" width="24" height="8" rx="2" fill="#FAF3E0"/>
      <ellipse cx="20" cy="36" rx="12" ry="6" fill="#E8B84B"/>
      {/* Spool center hole */}
      <ellipse cx="20" cy="40" rx="4" ry="2.5" fill="#3D3D3D" opacity="0.4"/>
      {/* Needle */}
      <rect x="32" y="8" width="4" height="36" rx="2" fill="#FAF3E0" transform="rotate(20 32 8)"/>
      {/* Needle eye */}
      <ellipse cx="33" cy="12" rx="3" ry="1.5" fill="none" stroke="#3D3D3D" strokeWidth="1.5" transform="rotate(20 33 12)"/>
      {/* Thread line from spool through needle */}
      <path d="M22 38 Q34 20 36 12" stroke="#7D9B76" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Thread tail */}
      <path d="M42 28 Q50 34 48 44 Q46 50 40 52" stroke="#7D9B76" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="3 2"/>
      {/* Thimble */}
      <path d="M48 44 Q48 56 52 56 Q56 56 56 44 Z" fill="#3D3D3D"/>
      <ellipse cx="52" cy="44" rx="4" ry="2" fill="#FAF3E0"/>
      {/* Thimble dimples */}
      <circle cx="50" cy="48" r="1" fill="#FAF3E0" opacity="0.5"/>
      <circle cx="54" cy="48" r="1" fill="#FAF3E0" opacity="0.5"/>
      <circle cx="52" cy="52" r="1" fill="#FAF3E0" opacity="0.5"/>
    </svg>
  );
}

export function ForkKnifeIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Fork */}
      <rect x="18" y="36" width="4" height="20" rx="2" fill="#FAF3E0"/>
      {/* Fork tines */}
      <rect x="16" y="10" width="3" height="16" rx="1.5" fill="#FAF3E0"/>
      <rect x="20" y="10" width="3" height="16" rx="1.5" fill="#FAF3E0"/>
      <rect x="24" y="10" width="3" height="16" rx="1.5" fill="#FAF3E0"/>
      {/* Fork neck join */}
      <path d="M16 26 Q16 36 18 36 Q22 36 24 26 Z" fill="#FAF3E0"/>
      {/* Knife */}
      <rect x="38" y="36" width="4" height="20" rx="2" fill="#FAF3E0"/>
      {/* Knife blade */}
      <path d="M38 10 L42 10 L42 34 Q38 32 38 10 Z" fill="#FAF3E0"/>
      {/* Knife edge - sharpened side highlight */}
      <path d="M42 10 L44 18 L42 34" stroke="#3D3D3D" strokeWidth="1" fill="none" opacity="0.3"/>
      {/* Decorative plate circle */}
      <circle cx="32" cy="36" r="14" fill="none" stroke="#FAF3E0" strokeWidth="2" opacity="0.4"/>
    </svg>
  );
}

export function HammerHeartIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Hammer handle */}
      <rect x="34" y="32" width="6" height="22" rx="3" fill="#FAF3E0" transform="rotate(-45 34 32)"/>
      {/* Hammer head */}
      <rect x="10" y="10" width="22" height="14" rx="3" fill="#FAF3E0"/>
      <rect x="10" y="10" width="8" height="14" rx="3" fill="#3D3D3D" opacity="0.4"/>
      {/* Heart overlay */}
      <path d="M36 42 Q36 36 42 36 Q48 36 48 42 Q48 48 36 54 Q24 48 24 42 Q24 36 30 36 Q36 36 36 42 Z" fill="#E8B84B"/>
    </svg>
  );
}
