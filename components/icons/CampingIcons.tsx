// Camping Icons

export function TentIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Ground */}
      <rect x="6" y="50" width="52" height="3" rx="1.5" fill="#7D9B76"/>
      {/* Main tent body */}
      <polygon points="32,10 6,50 58,50" fill="#C1502E"/>
      {/* Tent inner shadow */}
      <polygon points="32,10 18,50 46,50" fill="#3D3D3D" opacity="0.25"/>
      {/* Tent door */}
      <polygon points="32,22 22,50 42,50" fill="#3D3D3D" opacity="0.6"/>
      {/* Door opening arc */}
      <path d="M24 50 Q32 34 40 50" fill="#FAF3E0" opacity="0.9"/>
      {/* Ridge pole */}
      <line x1="32" y1="10" x2="32" y2="50" stroke="#FAF3E0" strokeWidth="1.5" opacity="0.3"/>
      {/* Guy line left */}
      <line x1="32" y1="10" x2="10" y2="44" stroke="#FAF3E0" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
      {/* Guy line right */}
      <line x1="32" y1="10" x2="54" y2="44" stroke="#FAF3E0" strokeWidth="1" opacity="0.4" strokeDasharray="2 2"/>
    </svg>
  );
}

export function SleepingBagIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Bag body - rolled/unrolled shape */}
      <rect x="10" y="20" width="44" height="30" rx="15" fill="#6B8FA3"/>
      {/* Zipper line */}
      <line x1="32" y1="20" x2="32" y2="50" stroke="#FAF3E0" strokeWidth="2" strokeDasharray="3 2"/>
      {/* Zipper pull */}
      <circle cx="32" cy="38" r="3" fill="#E8B84B"/>
      {/* Hood section */}
      <ellipse cx="32" cy="20" rx="18" ry="8" fill="#C1502E"/>
      {/* Padding lines */}
      <line x1="14" y1="30" x2="50" y2="30" stroke="#FAF3E0" strokeWidth="1.5" opacity="0.4"/>
      <line x1="14" y1="38" x2="50" y2="38" stroke="#FAF3E0" strokeWidth="1.5" opacity="0.4"/>
      {/* Hood opening */}
      <ellipse cx="32" cy="20" rx="8" ry="4" fill="#3D3D3D"/>
    </svg>
  );
}

export function CoolerIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Cooler body */}
      <rect x="8" y="26" width="48" height="28" rx="5" fill="#FAF3E0"/>
      {/* Lid */}
      <rect x="8" y="18" width="48" height="12" rx="5" fill="#6B8FA3"/>
      {/* Lid highlight */}
      <rect x="12" y="20" width="40" height="4" rx="2" fill="#FAF3E0" opacity="0.4"/>
      {/* Handle on lid */}
      <rect x="24" y="12" width="16" height="6" rx="3" fill="#3D3D3D"/>
      {/* Latch left */}
      <rect x="10" y="28" width="6" height="10" rx="2" fill="#C1502E"/>
      {/* Latch right */}
      <rect x="48" y="28" width="6" height="10" rx="2" fill="#C1502E"/>
      {/* Side handles */}
      <rect x="8" y="36" width="4" height="10" rx="2" fill="#3D3D3D"/>
      <rect x="52" y="36" width="4" height="10" rx="2" fill="#3D3D3D"/>
      {/* Drain plug */}
      <circle cx="32" cy="52" r="3" fill="#3D3D3D"/>
      {/* Ice crystals on body */}
      <text x="20" y="46" fontSize="12" fill="#6B8FA3" opacity="0.5">*</text>
      <text x="34" y="44" fontSize="10" fill="#6B8FA3" opacity="0.5">*</text>
      <text x="42" y="47" fontSize="8" fill="#6B8FA3" opacity="0.5">*</text>
    </svg>
  );
}

export function CampLanternIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Top cap */}
      <rect x="22" y="10" width="20" height="6" rx="3" fill="#3D3D3D"/>
      {/* Hang hook */}
      <path d="M32 6 Q38 6 38 10" stroke="#3D3D3D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Lantern body */}
      <rect x="18" y="16" width="28" height="30" rx="4" fill="#FAF3E0"/>
      {/* Glass panels */}
      <rect x="20" y="18" width="24" height="26" rx="3" fill="#FAF3E0" opacity="0.9"/>
      {/* Glow inside */}
      <ellipse cx="32" cy="31" rx="10" ry="11" fill="#E8B84B" opacity="0.7"/>
      {/* Flame */}
      <path d="M32 22 Q36 28 32 34 Q28 28 32 22 Z" fill="#C1502E"/>
      <path d="M32 26 Q34 29 32 33 Q30 29 32 26 Z" fill="#E8B84B"/>
      {/* Frame lines */}
      <line x1="32" y1="16" x2="32" y2="46" stroke="#3D3D3D" strokeWidth="1" opacity="0.3"/>
      {/* Base */}
      <rect x="18" y="46" width="28" height="6" rx="3" fill="#3D3D3D"/>
      {/* Light rays */}
      <line x1="14" y1="24" x2="10" y2="20" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="14" y1="31" x2="9" y2="31" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="50" y1="24" x2="54" y2="20" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="50" y1="31" x2="55" y2="31" stroke="#E8B84B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function BackpackIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Shoulder straps */}
      <path d="M22 16 Q14 24 14 38 L14 50" stroke="#3D3D3D" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <path d="M42 16 Q50 24 50 38 L50 50" stroke="#3D3D3D" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Main body */}
      <rect x="16" y="14" width="32" height="40" rx="8" fill="#C1502E"/>
      {/* Top handle */}
      <rect x="26" y="10" width="12" height="6" rx="3" fill="#3D3D3D"/>
      {/* Main zipper pocket */}
      <rect x="20" y="18" width="24" height="20" rx="4" fill="#FAF3E0" opacity="0.25"/>
      {/* Zipper pull main */}
      <line x1="20" y1="28" x2="44" y2="28" stroke="#FAF3E0" strokeWidth="1.5" strokeDasharray="2 2"/>
      <circle cx="44" cy="28" r="2.5" fill="#E8B84B"/>
      {/* Front pocket */}
      <rect x="20" y="40" width="24" height="10" rx="4" fill="#FAF3E0" opacity="0.2"/>
      <line x1="20" y1="45" x2="44" y2="45" stroke="#FAF3E0" strokeWidth="1.5" strokeDasharray="2 2"/>
      <circle cx="32" cy="45" r="2.5" fill="#E8B84B"/>
    </svg>
  );
}

export function KayakPaddleIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Paddle shaft */}
      <rect x="29" y="8" width="6" height="48" rx="3" fill="#FAF3E0"/>
      {/* Top blade */}
      <ellipse cx="32" cy="14" rx="10" ry="10" fill="#6B8FA3"/>
      <ellipse cx="32" cy="14" rx="6" ry="7" fill="#3D3D3D" opacity="0.3"/>
      {/* Top blade tip */}
      <ellipse cx="32" cy="8" rx="5" ry="3" fill="#6B8FA3"/>
      {/* Bottom blade - offset angle */}
      <ellipse cx="32" cy="50" rx="10" ry="10" fill="#C1502E"/>
      <ellipse cx="32" cy="50" rx="6" ry="7" fill="#3D3D3D" opacity="0.3"/>
      {/* Bottom blade tip */}
      <ellipse cx="32" cy="56" rx="5" ry="3" fill="#C1502E"/>
      {/* Grip marks */}
      <rect x="29" y="28" width="6" height="2" rx="1" fill="#3D3D3D" opacity="0.4"/>
      <rect x="29" y="32" width="6" height="2" rx="1" fill="#3D3D3D" opacity="0.4"/>
      <rect x="29" y="36" width="6" height="2" rx="1" fill="#3D3D3D" opacity="0.4"/>
    </svg>
  );
}
