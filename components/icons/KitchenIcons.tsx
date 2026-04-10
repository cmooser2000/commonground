// Kitchen Icons

export function StandMixerIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Base / platform */}
      <ellipse cx="32" cy="52" rx="22" ry="6" fill="#3D3D3D"/>
      {/* Arm */}
      <rect x="28" y="18" width="8" height="34" rx="4" fill="#FAF3E0"/>
      {/* Motor head */}
      <rect x="14" y="12" width="28" height="16" rx="8" fill="#FAF3E0"/>
      {/* Motor detail */}
      <circle cx="28" cy="20" r="6" fill="#E8B84B"/>
      <circle cx="28" cy="20" r="3" fill="#3D3D3D"/>
      {/* Speed dial */}
      <circle cx="38" cy="16" r="4" fill="#3D3D3D"/>
      <line x1="38" y1="14" x2="38" y2="12" stroke="#FAF3E0" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Bowl */}
      <path d="M10 46 Q10 58 32 58 Q54 58 54 46 L50 36 L14 36 Z" fill="#6B8FA3"/>
      {/* Bowl rim */}
      <ellipse cx="32" cy="36" rx="18" ry="5" fill="#6B8FA3"/>
      {/* Beater attachment */}
      <line x1="28" y1="26" x2="24" y2="46" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="26" x2="32" y2="46" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="26" x2="28" y2="46" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function InstantPotIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Pot body */}
      <rect x="10" y="24" width="44" height="30" rx="6" fill="#3D3D3D"/>
      {/* Pot body highlight */}
      <rect x="12" y="26" width="40" height="26" rx="5" fill="#FAF3E0" opacity="0.08"/>
      {/* Display panel */}
      <rect x="16" y="28" width="20" height="12" rx="3" fill="#1a1a1a"/>
      <rect x="18" y="30" width="16" height="8" rx="2" fill="#E8B84B" opacity="0.8"/>
      {/* Buttons */}
      <circle cx="42" cy="30" r="3" fill="#7D9B76"/>
      <circle cx="48" cy="30" r="3" fill="#C1502E"/>
      <circle cx="42" cy="38" r="3" fill="#6B8FA3"/>
      <circle cx="48" cy="38" r="3" fill="#FAF3E0" opacity="0.5"/>
      {/* Lid */}
      <rect x="10" y="16" width="44" height="10" rx="5" fill="#FAF3E0"/>
      {/* Lid handle */}
      <rect x="26" y="8" width="12" height="10" rx="4" fill="#3D3D3D"/>
      {/* Lid vent valve */}
      <circle cx="44" cy="21" r="4" fill="#3D3D3D"/>
      <rect x="43" y="16" width="2" height="4" rx="1" fill="#E8B84B"/>
      {/* Side handles */}
      <rect x="6" y="30" width="6" height="14" rx="3" fill="#3D3D3D"/>
      <rect x="52" y="30" width="6" height="14" rx="3" fill="#3D3D3D"/>
    </svg>
  );
}

export function CanningEquipmentIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Large jar body */}
      <rect x="14" y="22" width="24" height="32" rx="4" fill="#FAF3E0"/>
      {/* Jar neck */}
      <rect x="17" y="16" width="18" height="8" rx="3" fill="#FAF3E0"/>
      {/* Jar lid */}
      <rect x="15" y="12" width="22" height="6" rx="3" fill="#E8B84B"/>
      {/* Jar band */}
      <rect x="15" y="16" width="22" height="3" fill="#3D3D3D" opacity="0.3"/>
      {/* Jar contents - red preserves */}
      <rect x="16" y="30" width="20" height="22" rx="3" fill="#C1502E" opacity="0.5"/>
      {/* Small jar */}
      <rect x="40" y="32" width="16" height="22" rx="3" fill="#FAF3E0"/>
      <rect x="41" y="28" width="14" height="6" rx="2" fill="#FAF3E0"/>
      <rect x="40" y="24" width="16" height="5" rx="2" fill="#7D9B76"/>
      {/* Small jar contents */}
      <rect x="41" y="38" width="14" height="14" rx="2" fill="#7D9B76" opacity="0.5"/>
      {/* Label on large jar */}
      <rect x="17" y="33" width="18" height="10" rx="2" fill="#FAF3E0"/>
      <line x1="19" y1="36" x2="33" y2="36" stroke="#C1502E" strokeWidth="1.5"/>
      <line x1="19" y1="39" x2="31" y2="39" stroke="#C1502E" strokeWidth="1"/>
    </svg>
  );
}

export function PunchBowlIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Bowl body */}
      <path d="M8 28 Q8 52 32 52 Q56 52 56 28 Z" fill="#FAF3E0"/>
      {/* Punch liquid */}
      <path d="M10 36 Q10 50 32 50 Q54 50 54 36 Z" fill="#C1502E" opacity="0.7"/>
      {/* Bowl rim */}
      <ellipse cx="32" cy="28" rx="24" ry="7" fill="#FAF3E0"/>
      {/* Pedestal stem */}
      <rect x="28" y="52" width="8" height="6" rx="2" fill="#FAF3E0"/>
      {/* Pedestal base */}
      <rect x="20" y="56" width="24" height="4" rx="2" fill="#FAF3E0"/>
      {/* Ladle */}
      <path d="M46 16 L42 30" stroke="#E8B84B" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="40" cy="33" r="5" fill="none" stroke="#E8B84B" strokeWidth="2.5"/>
      {/* Ice / fruit floating */}
      <circle cx="22" cy="38" r="3" fill="#FAF3E0" opacity="0.8"/>
      <circle cx="36" cy="34" r="2" fill="#E8B84B" opacity="0.8"/>
      <circle cx="28" cy="42" r="2.5" fill="#FAF3E0" opacity="0.7"/>
    </svg>
  );
}

export function RoastingPanIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Pan body */}
      <rect x="10" y="24" width="44" height="26" rx="5" fill="#3D3D3D"/>
      {/* Pan interior */}
      <rect x="14" y="28" width="36" height="18" rx="3" fill="#FAF3E0" opacity="0.15"/>
      {/* Roasting rack inside */}
      <line x1="14" y1="34" x2="50" y2="34" stroke="#FAF3E0" strokeWidth="1.5" opacity="0.5"/>
      <line x1="14" y1="38" x2="50" y2="38" stroke="#FAF3E0" strokeWidth="1.5" opacity="0.5"/>
      <line x1="14" y1="42" x2="50" y2="42" stroke="#FAF3E0" strokeWidth="1.5" opacity="0.5"/>
      <line x1="22" y1="28" x2="22" y2="46" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
      <line x1="32" y1="28" x2="32" y2="46" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
      <line x1="42" y1="28" x2="42" y2="46" stroke="#FAF3E0" strokeWidth="1" opacity="0.4"/>
      {/* Handles */}
      <rect x="4" y="28" width="8" height="12" rx="4" fill="#3D3D3D"/>
      <rect x="52" y="28" width="8" height="12" rx="4" fill="#3D3D3D"/>
      {/* Roast/turkey shape inside */}
      <ellipse cx="32" cy="36" rx="12" ry="7" fill="#E8B84B" opacity="0.7"/>
      <ellipse cx="24" cy="32" rx="4" ry="3" fill="#E8B84B" opacity="0.7"/>
      <ellipse cx="40" cy="32" rx="4" ry="3" fill="#E8B84B" opacity="0.7"/>
      {/* Steam lines */}
      <path d="M24 22 Q26 18 24 14" stroke="#FAF3E0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M32 22 Q34 18 32 14" stroke="#FAF3E0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M40 22 Q42 18 40 14" stroke="#FAF3E0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function FondueSetIcon({ size = 64, bgColor = '#C1502E' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Fondue pot body */}
      <path d="M16 30 Q14 50 32 50 Q50 50 48 30 Z" fill="#FAF3E0"/>
      {/* Pot top rim */}
      <ellipse cx="32" cy="30" rx="16" ry="5" fill="#FAF3E0"/>
      {/* Cheese/chocolate contents */}
      <ellipse cx="32" cy="30" rx="14" ry="4" fill="#E8B84B"/>
      {/* Pot handles */}
      <rect x="10" y="30" width="8" height="6" rx="3" fill="#FAF3E0"/>
      <rect x="46" y="30" width="8" height="6" rx="3" fill="#FAF3E0"/>
      {/* Stand legs */}
      <line x1="20" y1="50" x2="16" y2="58" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round"/>
      <line x1="32" y1="50" x2="32" y2="58" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round"/>
      <line x1="44" y1="50" x2="48" y2="58" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round"/>
      {/* Candle/burner */}
      <rect x="28" y="52" width="8" height="4" rx="1" fill="#E8B84B"/>
      <path d="M32 52 Q34 48 32 44 Q30 48 32 52 Z" fill="#C1502E"/>
      {/* Fondue fork */}
      <line x1="44" y1="12" x2="40" y2="32" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round"/>
      <line x1="38" y1="12" x2="39" y2="20" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="42" y1="12" x2="40.5" y2="20" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="36" y="10" width="10" height="4" rx="2" fill="#C1502E"/>
      {/* Second fork */}
      <line x1="52" y1="14" x2="48" y2="30" stroke="#3D3D3D" strokeWidth="2" strokeLinecap="round"/>
      <rect x="49" y="12" width="8" height="4" rx="2" fill="#7D9B76"/>
    </svg>
  );
}
