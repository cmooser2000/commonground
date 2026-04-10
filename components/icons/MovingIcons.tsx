// Moving Icons

export function MovingBoxesIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Back box */}
      <rect x="28" y="14" width="26" height="24" rx="3" fill="#FAF3E0"/>
      {/* Back box flaps closed */}
      <rect x="28" y="14" width="12" height="6" rx="2" fill="#E8B84B"/>
      <rect x="40" y="14" width="14" height="6" rx="2" fill="#E8B84B"/>
      {/* Back box tape */}
      <line x1="41" y1="14" x2="41" y2="38" stroke="#C1502E" strokeWidth="2"/>
      {/* Front big box */}
      <rect x="8" y="28" width="32" height="26" rx="3" fill="#FAF3E0"/>
      {/* Front box flaps */}
      <rect x="8" y="28" width="14" height="7" rx="2" fill="#E8B84B"/>
      <rect x="22" y="28" width="18" height="7" rx="2" fill="#E8B84B"/>
      {/* Front box tape */}
      <line x1="24" y1="28" x2="24" y2="54" stroke="#C1502E" strokeWidth="2"/>
      {/* Label strip */}
      <rect x="12" y="40" width="20" height="8" rx="2" fill="#FAF3E0"/>
      <line x1="14" y1="43" x2="30" y2="43" stroke="#6B8FA3" strokeWidth="1.5"/>
      <line x1="14" y1="46" x2="26" y2="46" stroke="#6B8FA3" strokeWidth="1"/>
      {/* Small box on top of back */}
      <rect x="34" y="6" width="16" height="12" rx="2" fill="#FAF3E0"/>
      <rect x="34" y="6" width="7" height="4" rx="1" fill="#E8B84B"/>
      <rect x="41" y="6" width="9" height="4" rx="1" fill="#E8B84B"/>
    </svg>
  );
}

export function HandTruckIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Vertical frame */}
      <rect x="28" y="8" width="6" height="44" rx="3" fill="#3D3D3D"/>
      {/* Horizontal platform/nose plate */}
      <rect x="14" y="46" width="24" height="5" rx="2.5" fill="#3D3D3D"/>
      {/* Handle bar (T-top) */}
      <rect x="18" y="8" width="26" height="6" rx="3" fill="#3D3D3D"/>
      {/* Axle */}
      <rect x="22" y="50" width="18" height="3" rx="1.5" fill="#FAF3E0"/>
      {/* Left wheel */}
      <circle cx="22" cy="54" r="7" fill="#FAF3E0"/>
      <circle cx="22" cy="54" r="3" fill="#3D3D3D"/>
      {/* Right wheel */}
      <circle cx="40" cy="54" r="7" fill="#FAF3E0"/>
      <circle cx="40" cy="54" r="3" fill="#3D3D3D"/>
      {/* Box strapped to frame */}
      <rect x="8" y="20" width="20" height="24" rx="3" fill="#E8B84B"/>
      {/* Box detail */}
      <rect x="10" y="26" width="16" height="10" rx="2" fill="#FAF3E0" opacity="0.4"/>
      {/* Strap */}
      <line x1="8" y1="30" x2="28" y2="30" stroke="#C1502E" strokeWidth="2"/>
    </svg>
  );
}

export function CargoStrapsIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Top strap hook left */}
      <path d="M10 16 Q10 10 16 10 L16 14" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <rect x="14" y="13" width="6" height="4" rx="1" fill="#3D3D3D"/>
      {/* Top strap hook right */}
      <path d="M54 16 Q54 10 48 10 L48 14" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <rect x="44" y="13" width="6" height="4" rx="1" fill="#3D3D3D"/>
      {/* Main strap 1 */}
      <path d="M16 16 L28 22 L32 22 L44 16" stroke="#C1502E" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Ratchet buckle */}
      <rect x="26" y="20" width="12" height="8" rx="3" fill="#FAF3E0"/>
      <rect x="28" y="22" width="8" height="4" rx="1" fill="#3D3D3D"/>
      {/* Second strap below */}
      <path d="M10 34 Q10 28 16 28 L16 32" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <rect x="14" y="31" width="6" height="4" rx="1" fill="#3D3D3D"/>
      <path d="M54 34 Q54 28 48 28 L48 32" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <rect x="44" y="31" width="6" height="4" rx="1" fill="#3D3D3D"/>
      <path d="M16 34 L28 40 L32 40 L44 34" stroke="#E8B84B" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Ratchet buckle 2 */}
      <rect x="26" y="38" width="12" height="8" rx="3" fill="#FAF3E0"/>
      <rect x="28" y="40" width="8" height="4" rx="1" fill="#3D3D3D"/>
      {/* Coiled strap at bottom */}
      <path d="M16 52 Q20 48 24 52 Q28 56 32 52 Q36 48 40 52 Q44 56 48 52" stroke="#C1502E" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function RoofRackIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Car roof silhouette */}
      <path d="M8 40 L16 24 L48 24 L56 40 Z" fill="#3D3D3D"/>
      {/* Car body below */}
      <rect x="6" y="40" width="52" height="12" rx="4" fill="#3D3D3D"/>
      {/* Windows */}
      <polygon points="18,24 22,30 42,30 46,24" fill="#6B8FA3" opacity="0.6"/>
      {/* Roof rack side rails */}
      <rect x="10" y="18" width="44" height="4" rx="2" fill="#FAF3E0"/>
      {/* Cross bars */}
      <rect x="14" y="14" width="4" height="10" rx="2" fill="#FAF3E0"/>
      <rect x="28" y="14" width="4" height="10" rx="2" fill="#FAF3E0"/>
      <rect x="44" y="14" width="4" height="10" rx="2" fill="#FAF3E0"/>
      {/* Foot mounts */}
      <rect x="12" y="20" width="8" height="4" rx="1" fill="#E8B84B"/>
      <rect x="26" y="20" width="8" height="4" rx="1" fill="#E8B84B"/>
      <rect x="42" y="20" width="8" height="4" rx="1" fill="#E8B84B"/>
      {/* Wheels */}
      <circle cx="18" cy="54" r="6" fill="#FAF3E0"/>
      <circle cx="18" cy="54" r="3" fill="#3D3D3D"/>
      <circle cx="46" cy="54" r="6" fill="#FAF3E0"/>
      <circle cx="46" cy="54" r="3" fill="#3D3D3D"/>
    </svg>
  );
}
