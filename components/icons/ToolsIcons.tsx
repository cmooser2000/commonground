// Tools & Home Icons

export function HammerIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Handle */}
      <rect x="30" y="30" width="8" height="22" rx="3" fill="#FAF3E0" transform="rotate(-45 30 30)"/>
      {/* Hammer head body */}
      <rect x="10" y="10" width="22" height="14" rx="3" fill="#3D3D3D"/>
      {/* Hammer head face */}
      <rect x="10" y="10" width="8" height="14" rx="3" fill="#C1502E"/>
    </svg>
  );
}

export function PowerDrillIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Drill body */}
      <rect x="10" y="20" width="30" height="16" rx="4" fill="#3D3D3D"/>
      {/* Drill chuck */}
      <rect x="38" y="24" width="14" height="8" rx="2" fill="#FAF3E0"/>
      {/* Drill bit */}
      <rect x="50" y="27" width="8" height="2" rx="1" fill="#C1502E"/>
      {/* Handle */}
      <rect x="14" y="34" width="14" height="16" rx="4" fill="#3D3D3D"/>
      {/* Trigger */}
      <rect x="20" y="30" width="5" height="8" rx="2" fill="#C1502E"/>
      {/* Battery/motor detail */}
      <rect x="13" y="23" width="10" height="10" rx="2" fill="#E8B84B"/>
    </svg>
  );
}

export function CircularSawIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Saw body */}
      <rect x="8" y="14" width="30" height="20" rx="4" fill="#3D3D3D"/>
      {/* Handle */}
      <rect x="30" y="10" width="12" height="28" rx="4" fill="#3D3D3D"/>
      {/* Blade guard */}
      <path d="M16 34 Q16 52 36 52 Q36 44 28 44 Q20 44 20 34 Z" fill="#FAF3E0"/>
      {/* Blade */}
      <circle cx="28" cy="44" r="10" fill="none" stroke="#C1502E" strokeWidth="3"/>
      <circle cx="28" cy="44" r="3" fill="#C1502E"/>
      {/* Blade teeth */}
      <polygon points="28,34 26,31 30,31" fill="#C1502E"/>
      <polygon points="36,40 39,38 39,42" fill="#C1502E"/>
      <polygon points="28,54 26,57 30,57" fill="#C1502E"/>
      <polygon points="18,48 15,46 15,50" fill="#C1502E"/>
      {/* Base plate */}
      <rect x="10" y="50" width="26" height="4" rx="2" fill="#E8B84B"/>
    </svg>
  );
}

export function LadderIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Left rail */}
      <rect x="16" y="8" width="5" height="50" rx="2.5" fill="#FAF3E0"/>
      {/* Right rail */}
      <rect x="43" y="8" width="5" height="50" rx="2.5" fill="#FAF3E0"/>
      {/* Rungs */}
      <rect x="16" y="16" width="32" height="4" rx="2" fill="#E8B84B"/>
      <rect x="16" y="26" width="32" height="4" rx="2" fill="#E8B84B"/>
      <rect x="16" y="36" width="32" height="4" rx="2" fill="#E8B84B"/>
      <rect x="16" y="46" width="32" height="4" rx="2" fill="#E8B84B"/>
    </svg>
  );
}

export function WrenchSetIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Wrench 1 - large */}
      <path d="M14 50 L34 20" stroke="#FAF3E0" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="36" cy="17" r="6" fill="none" stroke="#FAF3E0" strokeWidth="3"/>
      <rect x="12" y="47" width="6" height="8" rx="2" fill="#FAF3E0"/>
      {/* Wrench 2 - small */}
      <path d="M38 54 L50 30" stroke="#E8B84B" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="51" cy="27" r="4" fill="none" stroke="#E8B84B" strokeWidth="2.5"/>
      <rect x="36" y="52" width="5" height="6" rx="1.5" fill="#E8B84B"/>
      {/* Screwdriver */}
      <rect x="22" y="10" width="4" height="28" rx="2" fill="#C1502E"/>
      <polygon points="22,38 26,38 28,44 20,44" fill="#3D3D3D"/>
      <rect x="23" y="44" width="2" height="8" rx="1" fill="#3D3D3D"/>
    </svg>
  );
}

export function PaintRollerIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Roller frame - horizontal bar */}
      <rect x="12" y="18" width="34" height="4" rx="2" fill="#3D3D3D"/>
      {/* Roller frame - vertical bar */}
      <rect x="42" y="18" width="4" height="16" rx="2" fill="#3D3D3D"/>
      {/* Handle */}
      <rect x="43" y="30" width="4" height="22" rx="2" fill="#FAF3E0" transform="rotate(15 43 30)"/>
      {/* Roller drum */}
      <rect x="10" y="22" width="26" height="14" rx="7" fill="#C1502E"/>
      {/* Paint strokes below */}
      <rect x="10" y="42" width="26" height="5" rx="2" fill="#C1502E" opacity="0.6"/>
      <rect x="10" y="49" width="20" height="4" rx="2" fill="#C1502E" opacity="0.35"/>
    </svg>
  );
}

export function CaulkGunIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Tube body */}
      <rect x="16" y="22" width="28" height="12" rx="4" fill="#FAF3E0"/>
      {/* Tube label band */}
      <rect x="24" y="22" width="12" height="12" fill="#E8B84B"/>
      {/* Nozzle */}
      <polygon points="44,25 44,31 56,29 56,27" fill="#3D3D3D"/>
      <circle cx="57" cy="28" r="2" fill="#C1502E"/>
      {/* Frame back */}
      <rect x="8" y="20" width="10" height="16" rx="3" fill="#3D3D3D"/>
      {/* Frame rod */}
      <rect x="8" y="27" width="36" height="2" rx="1" fill="#3D3D3D"/>
      {/* Handle */}
      <rect x="10" y="34" width="12" height="16" rx="3" fill="#3D3D3D"/>
      {/* Trigger */}
      <rect x="18" y="28" width="4" height="10" rx="2" fill="#C1502E"/>
      {/* Plunger rod */}
      <rect x="6" y="27.5" width="12" height="1" rx="0.5" fill="#FAF3E0"/>
      <circle cx="7" cy="28" r="3" fill="#FAF3E0"/>
    </svg>
  );
}

export function StudFinderIcon({ size = 64, bgColor = '#6B8FA3' }: { size?: number; bgColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill={bgColor}/>
      {/* Device body */}
      <rect x="18" y="12" width="28" height="40" rx="6" fill="#FAF3E0"/>
      {/* Screen */}
      <rect x="22" y="16" width="20" height="14" rx="3" fill="#3D3D3D"/>
      {/* Screen indicator - stud detected */}
      <rect x="29" y="19" width="6" height="8" rx="1" fill="#E8B84B"/>
      {/* Buttons */}
      <circle cx="28" cy="38" r="4" fill="#7D9B76"/>
      <circle cx="36" cy="38" r="4" fill="#C1502E"/>
      {/* Bottom sensor strip */}
      <rect x="18" y="48" width="28" height="4" rx="2" fill="#3D3D3D"/>
      {/* Signal arcs above screen */}
      <path d="M26 15 Q32 10 38 15" stroke="#E8B84B" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M23 14 Q32 7 41 14" stroke="#E8B84B" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}
