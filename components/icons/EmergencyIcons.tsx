// Emergency Icons

export function GeneratorIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Generator body */}
      <rect x="8" y="22" width="48" height="28" rx="5" fill="#3D3D3D"/>
      {/* Panel face */}
      <rect x="12" y="26" width="26" height="20" rx="3" fill="#FAF3E0" opacity="0.12"/>
      {/* Power outlet */}
      <rect x="14" y="28" width="10" height="8" rx="2" fill="#FAF3E0" opacity="0.8"/>
      <circle cx="17" cy="32" r="1.5" fill="#3D3D3D"/>
      <circle cx="21" cy="32" r="1.5" fill="#3D3D3D"/>
      {/* Second outlet */}
      <rect x="14" y="38" width="10" height="8" rx="2" fill="#FAF3E0" opacity="0.8"/>
      <circle cx="17" cy="42" r="1.5" fill="#3D3D3D"/>
      <circle cx="21" cy="42" r="1.5" fill="#3D3D3D"/>
      {/* Engine/motor area */}
      <rect x="38" y="26" width="14" height="20" rx="3" fill="#FAF3E0" opacity="0.1"/>
      <circle cx="45" cy="36" r="7" fill="#E8B84B" opacity="0.8"/>
      <circle cx="45" cy="36" r="4" fill="#3D3D3D"/>
      {/* Exhaust pipe */}
      <rect x="52" y="18" width="4" height="12" rx="2" fill="#3D3D3D"/>
      <path d="M50 18 Q52 12 56 14" stroke="#FAF3E0" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Handle */}
      <path d="M16 22 Q24 14 40 14 Q48 14 48 22" stroke="#3D3D3D" strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Wheels */}
      <circle cx="18" cy="52" r="5" fill="#FAF3E0"/>
      <circle cx="18" cy="52" r="2" fill="#3D3D3D"/>
      <circle cx="46" cy="52" r="5" fill="#FAF3E0"/>
      <circle cx="46" cy="52" r="2" fill="#3D3D3D"/>
      {/* Lightning bolt label */}
      <polygon points="28,27 24,34 28,34 24,43 32,34 28,34 32,27" fill="#E8B84B"/>
    </svg>
  );
}

export function FirstAidKitIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Kit box */}
      <rect x="10" y="18" width="44" height="32" rx="5" fill="#FAF3E0"/>
      {/* Red cross */}
      <rect x="26" y="24" width="12" height="20" rx="3" fill="#C1502E"/>
      <rect x="20" y="30" width="24" height="8" rx="3" fill="#C1502E"/>
      {/* Box latch */}
      <rect x="28" y="14" width="8" height="6" rx="2" fill="#3D3D3D"/>
      {/* Handle */}
      <rect x="24" y="10" width="16" height="6" rx="3" fill="#3D3D3D"/>
      {/* Box lid line */}
      <rect x="10" y="28" width="44" height="3" rx="1" fill="#3D3D3D" opacity="0.2"/>
      {/* Clasp dots */}
      <circle cx="12" cy="34" r="2.5" fill="#E8B84B"/>
      <circle cx="52" cy="34" r="2.5" fill="#E8B84B"/>
    </svg>
  );
}

export function FlashlightIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Handle/body */}
      <rect x="26" y="32" width="12" height="24" rx="5" fill="#3D3D3D"/>
      {/* Battery grip ridges */}
      <rect x="26" y="36" width="12" height="2" rx="1" fill="#FAF3E0" opacity="0.2"/>
      <rect x="26" y="40" width="12" height="2" rx="1" fill="#FAF3E0" opacity="0.2"/>
      <rect x="26" y="44" width="12" height="2" rx="1" fill="#FAF3E0" opacity="0.2"/>
      {/* Head / reflector housing */}
      <path d="M22 18 L22 32 L42 32 L42 18 Z" fill="#3D3D3D"/>
      <path d="M20 16 L44 16 L44 20 L20 20 Z" fill="#3D3D3D"/>
      {/* Lens / light face */}
      <ellipse cx="32" cy="16" rx="12" ry="5" fill="#FAF3E0"/>
      <ellipse cx="32" cy="16" rx="8" ry="3" fill="#E8B84B"/>
      <ellipse cx="32" cy="16" rx="4" ry="1.5" fill="#FAF3E0"/>
      {/* Light beam cone */}
      <path d="M20 16 L6 6 L8 14 L20 20 Z" fill="#E8B84B" opacity="0.5"/>
      <path d="M20 16 L4 22 L10 26 L20 20 Z" fill="#E8B84B" opacity="0.35"/>
      {/* On/off button */}
      <circle cx="32" cy="30" r="3" fill="#C1502E"/>
      {/* Power indicator */}
      <circle cx="32" cy="30" r="1.5" fill="#E8B84B"/>
    </svg>
  );
}

export function WaterContainerIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Large water jug body */}
      <rect x="14" y="18" width="36" height="38" rx="6" fill="#FAF3E0"/>
      {/* Water level inside - blue fill */}
      <rect x="16" y="32" width="32" height="22" rx="4" fill="#6B8FA3" opacity="0.7"/>
      {/* Water surface wavy line */}
      <path d="M16 32 Q20 28 24 32 Q28 36 32 32 Q36 28 40 32 Q44 36 48 32" stroke="#6B8FA3" strokeWidth="2" fill="none"/>
      {/* Neck */}
      <rect x="22" y="10" width="20" height="10" rx="3" fill="#FAF3E0"/>
      {/* Cap */}
      <rect x="20" y="6" width="24" height="6" rx="3" fill="#3D3D3D"/>
      {/* Cap ridge */}
      <rect x="22" y="8" width="20" height="2" rx="1" fill="#FAF3E0" opacity="0.3"/>
      {/* Carry handle */}
      <path d="M28 10 Q28 4 36 4 Q44 4 44 10" stroke="#3D3D3D" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Spout/tap */}
      <rect x="48" y="44" width="8" height="6" rx="2" fill="#3D3D3D"/>
      <rect x="54" y="43" width="4" height="8" rx="2" fill="#C1502E"/>
      {/* Label */}
      <rect x="18" y="34" width="20" height="12" rx="2" fill="#FAF3E0" opacity="0.6"/>
      <line x1="20" y1="38" x2="36" y2="38" stroke="#6B8FA3" strokeWidth="1.5"/>
      <line x1="20" y1="41" x2="32" y2="41" stroke="#6B8FA3" strokeWidth="1"/>
    </svg>
  );
}

export function MegaphoneIcon({ size = 64, bgColor = '#7D9B76' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Megaphone body cone */}
      <path d="M14 26 L14 38 L46 50 L46 14 Z" fill="#E8B84B"/>
      {/* Mouth piece / speaker box */}
      <rect x="8" y="26" width="8" height="12" rx="3" fill="#3D3D3D"/>
      {/* Cone highlight */}
      <path d="M14 26 L46 14 L46 20 L14 30 Z" fill="#FAF3E0" opacity="0.2"/>
      {/* Rim of cone opening */}
      <ellipse cx="46" cy="32" rx="5" ry="18" fill="none" stroke="#3D3D3D" strokeWidth="2"/>
      {/* Handle */}
      <rect x="22" y="38" width="14" height="5" rx="2.5" fill="#3D3D3D"/>
      <line x1="26" y1="38" x2="26" y2="56" stroke="#3D3D3D" strokeWidth="4" strokeLinecap="round"/>
      {/* Sound waves */}
      <path d="M52 22 Q56 26 56 32 Q56 38 52 42" stroke="#FAF3E0" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M56 18 Q62 24 62 32 Q62 40 56 46" stroke="#FAF3E0" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>
  );
}
