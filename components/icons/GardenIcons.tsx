// Garden Icons

export function LeafBlowerIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Motor body */}
      <rect x="10" y="22" width="22" height="14" rx="5" fill="#3D3D3D"/>
      {/* Intake fan circle */}
      <circle cx="14" cy="29" r="5" fill="#FAF3E0"/>
      <circle cx="14" cy="29" r="2" fill="#3D3D3D"/>
      {/* Tube */}
      <path d="M32 26 Q44 22 52 18" stroke="#FAF3E0" strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d="M32 30 Q44 34 52 38" stroke="#FAF3E0" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0"/>
      {/* Nozzle */}
      <path d="M48 16 L56 20 L56 16 Z" fill="#FAF3E0"/>
      {/* Handle */}
      <rect x="16" y="34" width="10" height="16" rx="4" fill="#3D3D3D"/>
      {/* Trigger */}
      <rect x="21" y="30" width="4" height="9" rx="2" fill="#E8B84B"/>
      {/* Air whoosh lines */}
      <path d="M53 15 Q57 13 58 10" stroke="#E8B84B" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M55 19 Q60 18 62 16" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M54 23 Q59 24 61 22" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function LawnMowerIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Deck / body */}
      <rect x="8" y="30" width="40" height="14" rx="4" fill="#3D3D3D"/>
      {/* Engine top */}
      <rect x="18" y="20" width="20" height="12" rx="3" fill="#C1502E"/>
      {/* Engine detail */}
      <rect x="22" y="22" width="4" height="6" rx="1" fill="#FAF3E0"/>
      {/* Handle bar */}
      <rect x="38" y="16" width="4" height="28" rx="2" fill="#FAF3E0"/>
      <rect x="38" y="16" width="14" height="4" rx="2" fill="#FAF3E0"/>
      {/* Wheels */}
      <circle cx="16" cy="46" r="7" fill="#FAF3E0"/>
      <circle cx="16" cy="46" r="3" fill="#3D3D3D"/>
      <circle cx="40" cy="46" r="7" fill="#FAF3E0"/>
      <circle cx="40" cy="46" r="3" fill="#3D3D3D"/>
      {/* Grass blades */}
      <path d="M6 54 Q8 48 10 54" stroke="#E8B84B" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M11 54 Q13 47 15 54" stroke="#E8B84B" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M45 54 Q47 48 49 54" stroke="#E8B84B" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M50 54 Q52 47 54 54" stroke="#E8B84B" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function WheelbarrowIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Tray */}
      <path d="M14 20 L50 20 L44 40 L20 40 Z" fill="#E8B84B"/>
      {/* Tray rim */}
      <rect x="14" y="18" width="36" height="4" rx="2" fill="#C1502E"/>
      {/* Leg supports */}
      <line x1="20" y1="40" x2="12" y2="56" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round"/>
      <line x1="44" y1="40" x2="52" y2="56" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round"/>
      {/* Wheel axle */}
      <line x1="28" y1="44" x2="36" y2="44" stroke="#3D3D3D" strokeWidth="2"/>
      {/* Wheel */}
      <circle cx="32" cy="48" r="8" fill="#FAF3E0"/>
      <circle cx="32" cy="48" r="3" fill="#3D3D3D"/>
      {/* Handles */}
      <line x1="14" y1="20" x2="6" y2="36" stroke="#3D3D3D" strokeWidth="4" strokeLinecap="round"/>
      <line x1="50" y1="20" x2="58" y2="36" stroke="#3D3D3D" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

export function GardenHoeIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Handle */}
      <rect x="29" y="8" width="6" height="40" rx="3" fill="#FAF3E0"/>
      {/* Blade horizontal */}
      <rect x="14" y="44" width="36" height="8" rx="3" fill="#3D3D3D"/>
      {/* Blade teeth */}
      <rect x="17" y="52" width="4" height="6" rx="1" fill="#3D3D3D"/>
      <rect x="24" y="52" width="4" height="6" rx="1" fill="#3D3D3D"/>
      <rect x="31" y="52" width="4" height="6" rx="1" fill="#3D3D3D"/>
      <rect x="38" y="52" width="4" height="6" rx="1" fill="#3D3D3D"/>
      {/* Metal collar */}
      <rect x="27" y="40" width="10" height="6" rx="2" fill="#E8B84B"/>
    </svg>
  );
}

export function HoseSprinklerIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Hose coil */}
      <path d="M10 52 Q10 40 22 40 Q34 40 34 28 Q34 16 46 16 Q58 16 58 28" stroke="#FAF3E0" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Nozzle body */}
      <rect x="46" y="12" width="12" height="8" rx="3" fill="#3D3D3D"/>
      {/* Nozzle head */}
      <rect x="55" y="10" width="6" height="12" rx="3" fill="#C1502E"/>
      {/* Water spray drops */}
      <circle cx="57" cy="8" r="2" fill="#6B8FA3"/>
      <circle cx="62" cy="6" r="1.5" fill="#6B8FA3"/>
      <circle cx="60" cy="4" r="1.5" fill="#6B8FA3"/>
      <circle cx="54" cy="5" r="1.5" fill="#6B8FA3"/>
      <circle cx="58" cy="3" r="1" fill="#6B8FA3"/>
      {/* Hose end connector */}
      <rect x="6" y="49" width="8" height="6" rx="2" fill="#E8B84B"/>
      {/* Trigger */}
      <rect x="50" y="17" width="4" height="8" rx="2" fill="#E8B84B"/>
    </svg>
  );
}

export function PruningShearIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Handle 1 */}
      <path d="M10 48 Q14 40 20 34" stroke="#C1502E" strokeWidth="6" strokeLinecap="round" fill="none"/>
      {/* Handle 2 */}
      <path d="M54 48 Q50 40 44 34" stroke="#C1502E" strokeWidth="6" strokeLinecap="round" fill="none"/>
      {/* Pivot screw */}
      <circle cx="32" cy="32" r="4" fill="#3D3D3D"/>
      <circle cx="32" cy="32" r="2" fill="#FAF3E0"/>
      {/* Blade 1 */}
      <path d="M20 34 Q26 24 36 16" stroke="#FAF3E0" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Blade 2 */}
      <path d="M44 34 Q38 24 28 16" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Spring loop */}
      <path d="M18 36 Q10 28 18 22 Q26 16 28 26" stroke="#E8B84B" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function RakeIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Handle - diagonal */}
      <rect x="28" y="8" width="6" height="36" rx="3" fill="#FAF3E0" transform="rotate(10 28 8)"/>
      {/* Rake head bar */}
      <rect x="12" y="40" width="40" height="5" rx="2.5" fill="#3D3D3D"/>
      {/* Tines */}
      <rect x="15" y="45" width="3" height="10" rx="1.5" fill="#3D3D3D"/>
      <rect x="21" y="45" width="3" height="10" rx="1.5" fill="#3D3D3D"/>
      <rect x="27" y="45" width="3" height="10" rx="1.5" fill="#3D3D3D"/>
      <rect x="33" y="45" width="3" height="10" rx="1.5" fill="#3D3D3D"/>
      <rect x="39" y="45" width="3" height="10" rx="1.5" fill="#3D3D3D"/>
      <rect x="45" y="45" width="3" height="10" rx="1.5" fill="#3D3D3D"/>
      {/* Leaf decoration */}
      <path d="M14 38 Q18 32 24 36" fill="#E8B84B"/>
      <path d="M38 36 Q44 30 50 35" fill="#E8B84B"/>
    </svg>
  );
}
