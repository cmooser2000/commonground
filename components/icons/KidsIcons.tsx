// Kids Icons

export function BabyGearIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Stroller body */}
      <path d="M16 28 L24 48 L44 48 L48 28 Z" fill="#FAF3E0"/>
      {/* Stroller hood */}
      <path d="M16 28 Q20 14 38 14 L48 28 Z" fill="#C1502E"/>
      {/* Hood ribs */}
      <line x1="20" y1="16" x2="16" y2="28" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
      <line x1="30" y1="14" x2="26" y2="28" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
      <line x1="38" y1="14" x2="36" y2="28" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
      {/* Handle bar */}
      <path d="M46 28 L54 20" stroke="#3D3D3D" strokeWidth="4" strokeLinecap="round"/>
      <rect x="50" y="16" width="8" height="5" rx="2.5" fill="#3D3D3D"/>
      {/* Wheels */}
      <circle cx="24" cy="52" r="6" fill="#3D3D3D"/>
      <circle cx="24" cy="52" r="3" fill="#FAF3E0"/>
      <circle cx="44" cy="52" r="6" fill="#3D3D3D"/>
      <circle cx="44" cy="52" r="3" fill="#FAF3E0"/>
      {/* Baby face / dots suggestion */}
      <circle cx="32" cy="34" r="8" fill="#FAF3E0" opacity="0.3"/>
      {/* Safety harness */}
      <line x1="24" y1="36" x2="32" y2="44" stroke="#E8B84B" strokeWidth="1.5" opacity="0.6"/>
      <line x1="44" y1="36" x2="32" y2="44" stroke="#E8B84B" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  );
}

export function TrainingBikeIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Rear wheel */}
      <circle cx="46" cy="46" r="12" fill="none" stroke="#FAF3E0" strokeWidth="3"/>
      <circle cx="46" cy="46" r="4" fill="#FAF3E0"/>
      {/* Front wheel */}
      <circle cx="18" cy="46" r="12" fill="none" stroke="#FAF3E0" strokeWidth="3"/>
      <circle cx="18" cy="46" r="4" fill="#FAF3E0"/>
      {/* Frame - top tube */}
      <line x1="18" y1="34" x2="38" y2="28" stroke="#C1502E" strokeWidth="4" strokeLinecap="round"/>
      {/* Frame - down tube */}
      <line x1="24" y1="46" x2="38" y2="28" stroke="#C1502E" strokeWidth="4" strokeLinecap="round"/>
      {/* Frame - seat tube */}
      <line x1="38" y1="28" x2="38" y2="46" stroke="#C1502E" strokeWidth="4" strokeLinecap="round"/>
      {/* Frame - chain stay */}
      <line x1="38" y1="46" x2="46" y2="46" stroke="#C1502E" strokeWidth="3" strokeLinecap="round"/>
      {/* Handlebar stem */}
      <line x1="18" y1="34" x2="16" y2="22" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round"/>
      {/* Handlebar */}
      <rect x="10" y="20" width="16" height="4" rx="2" fill="#3D3D3D"/>
      {/* Seat post */}
      <line x1="38" y1="28" x2="36" y2="18" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round"/>
      {/* Seat */}
      <ellipse cx="34" cy="18" rx="8" ry="3" fill="#3D3D3D"/>
      {/* Spoke details */}
      <line x1="18" y1="34" x2="18" y2="58" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
      <line x1="6" y1="46" x2="30" y2="46" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

export function SportsEquipmentIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Soccer ball */}
      <circle cx="20" cy="34" r="14" fill="#FAF3E0"/>
      {/* Ball hexagon pattern */}
      <path d="M20 20 L14 26 L16 34 L24 34 L26 26 Z" fill="#3D3D3D" opacity="0.7"/>
      <path d="M26 34 L24 42 L20 46 L16 44 L14 36" fill="#3D3D3D" opacity="0.35"/>
      <circle cx="20" cy="34" r="14" fill="none" stroke="#3D3D3D" strokeWidth="1.5" opacity="0.3"/>
      {/* Baseball */}
      <circle cx="48" cy="22" r="10" fill="#FAF3E0"/>
      <path d="M42 18 Q44 22 42 26" stroke="#C1502E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M54 18 Q52 22 54 26" stroke="#C1502E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Laces stitches */}
      <line x1="43" y1="19" x2="45" y2="21" stroke="#C1502E" strokeWidth="1"/>
      <line x1="43" y1="23" x2="45" y2="25" stroke="#C1502E" strokeWidth="1"/>
      <line x1="51" y1="19" x2="53" y2="21" stroke="#C1502E" strokeWidth="1"/>
      <line x1="51" y1="23" x2="53" y2="25" stroke="#C1502E" strokeWidth="1"/>
      {/* Jump rope */}
      <path d="M36 44 Q42 36 50 44 Q58 52 56 56" stroke="#7D9B76" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <rect x="34" y="42" width="4" height="10" rx="2" fill="#3D3D3D"/>
      <rect x="54" y="54" width="4" height="10" rx="2" fill="#3D3D3D" transform="rotate(-20 54 54)"/>
    </svg>
  );
}

export function BoardGamesIcon({ size = 64, bgColor = '#E8B84B' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Game board base */}
      <rect x="8" y="24" width="48" height="32" rx="4" fill="#FAF3E0"/>
      {/* Board grid */}
      <line x1="8" y1="32" x2="56" y2="32" stroke="#3D3D3D" strokeWidth="1" opacity="0.3"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke="#3D3D3D" strokeWidth="1" opacity="0.3"/>
      <line x1="8" y1="48" x2="56" y2="48" stroke="#3D3D3D" strokeWidth="1" opacity="0.3"/>
      <line x1="20" y1="24" x2="20" y2="56" stroke="#3D3D3D" strokeWidth="1" opacity="0.3"/>
      <line x1="32" y1="24" x2="32" y2="56" stroke="#3D3D3D" strokeWidth="1" opacity="0.3"/>
      <line x1="44" y1="24" x2="44" y2="56" stroke="#3D3D3D" strokeWidth="1" opacity="0.3"/>
      {/* Game pieces */}
      <circle cx="14" cy="28" r="4" fill="#C1502E"/>
      <circle cx="26" cy="28" r="4" fill="#7D9B76"/>
      <circle cx="50" cy="44" r="4" fill="#6B8FA3"/>
      <circle cx="38" cy="52" r="4" fill="#C1502E"/>
      {/* Dice */}
      <rect x="36" y="8" width="20" height="20" rx="4" fill="#FAF3E0"/>
      <circle cx="41" cy="13" r="2" fill="#3D3D3D"/>
      <circle cx="51" cy="13" r="2" fill="#3D3D3D"/>
      <circle cx="46" cy="18" r="2" fill="#3D3D3D"/>
      <circle cx="41" cy="23" r="2" fill="#3D3D3D"/>
      <circle cx="51" cy="23" r="2" fill="#3D3D3D"/>
      {/* Stack of game boxes on left */}
      <rect x="8" y="10" width="22" height="14" rx="3" fill="#C1502E"/>
      <rect x="10" y="12" width="18" height="10" rx="2" fill="#FAF3E0" opacity="0.3"/>
      <line x1="14" y1="15" x2="26" y2="15" stroke="#FAF3E0" strokeWidth="1.5" opacity="0.6"/>
      <line x1="14" y1="18" x2="22" y2="18" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}
