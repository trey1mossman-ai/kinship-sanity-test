// Room & Event Feature Icons Component
// Using exact Kinship brand colors: #849e74 (primary green)

interface IconProps {
  className?: string;
}

// ========== BED TYPES ==========

export const KingBedIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="18" height="8" rx="1"/>
    <rect x="2" y="8" width="20" height="3" rx="1"/>
    <path d="M7 8 L7 5 L9 5 L9 8 M15 8 L15 5 L17 5 L17 8"/>
    <rect x="5" y="11.5" width="6" height="2" rx="1"/>
    <rect x="13" y="11.5" width="6" height="2" rx="1"/>
  </svg>
);

export const QueenBedIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="16" height="8" rx="1"/>
    <rect x="3" y="8" width="18" height="3" rx="1"/>
    <path d="M8 8 L8 5 L10 5 L10 8 M14 8 L14 5 L16 5 L16 8"/>
    <rect x="6" y="11.5" width="5" height="2" rx="1"/>
    <rect x="13" y="11.5" width="5" height="2" rx="1"/>
  </svg>
);

export const TwoQueensIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="11" width="9" height="6" rx="0.5"/>
    <rect x="13" y="11" width="9" height="6" rx="0.5"/>
    <rect x="1.5" y="9" width="10" height="2.5" rx="0.5"/>
    <rect x="12.5" y="9" width="10" height="2.5" rx="0.5"/>
  </svg>
);

export const BunkBedsIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="8" width="14" height="3" rx="0.5"/>
    <rect x="5" y="14" width="14" height="3" rx="0.5"/>
    <line x1="5" y1="6" x2="5" y2="19"/>
    <line x1="19" y1="6" x2="19" y2="19"/>
    <circle cx="8" cy="9.5" r="0.8"/>
    <circle cx="8" cy="15.5" r="0.8"/>
  </svg>
);

// ========== PRIORITY UNIVERSAL ICONS ==========
// These 5 icons ensure every room can have exactly 4 balanced icons

export const PremiumAmenitiesIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3 L18 3 L21 9 L12 21 L3 9 Z"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="6" y1="3" x2="9" y2="9"/>
    <line x1="18" y1="3" x2="15" y2="9"/>
    <line x1="12" y1="3" x2="12" y2="9"/>
    <line x1="9" y1="9" x2="12" y2="21"/>
    <line x1="15" y1="9" x2="12" y2="21"/>
  </svg>
);

export const SpaciousLayoutIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="1"/>
    <path d="M8 12 L6 12 L6 10 M16 12 L18 12 L18 10"/>
    <path d="M8 12 L6 12 L6 14 M16 12 L18 12 L18 14"/>
    <line x1="6" y1="12" x2="18" y2="12" strokeDasharray="1,1"/>
    <line x1="12" y1="6" x2="12" y2="18" strokeDasharray="1,1"/>
  </svg>
);

export const BoutiqueDesignIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="9" cy="9" r="1.5"/>
    <circle cx="15" cy="9" r="1.5"/>
    <circle cx="9" cy="15" r="1.5"/>
    <circle cx="15" cy="15" r="1.5"/>
    <circle cx="12" cy="12" r="1"/>
    <path d="M20 16 C21 16 22 17 22 18 C22 19 21 20 20 20"/>
  </svg>
);

export const SmartAmenitiesIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="10" width="10" height="10" rx="1"/>
    <path d="M4 10 L12 3 L20 10"/>
    <circle cx="12" cy="15" r="1.5"/>
    <path d="M9.5 12.5 C10.5 11.5 13.5 11.5 14.5 12.5"/>
    <path d="M8 11 C10 9 14 9 16 11"/>
  </svg>
);

export const FamilyFriendlyIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="5" r="1.5"/>
    <path d="M6 10 C6 8 7.5 7 9 7 C10.5 7 12 8 12 10 L12 13 L6 13 Z"/>
    <circle cx="16" cy="7" r="1"/>
    <path d="M14 11 C14 10 15 9 16 9 C17 9 18 10 18 11 L18 13 L14 13 Z"/>
    <path d="M9 13 L9 16 M7 16 L11 16"/>
    <path d="M16 13 L16 15 M14.5 15 L17.5 15"/>
  </svg>
);

// ========== ROOM VIEWS & FEATURES ==========

export const MountainViewIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20 L9 10 L13 16 L16 12 L21 20 Z"/>
    <circle cx="18" cy="6" r="2"/>
    <line x1="3" y1="20" x2="21" y2="20"/>
  </svg>
);

export const CityViewIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="10" width="4" height="10"/>
    <rect x="10" y="6" width="4" height="14"/>
    <rect x="16" y="8" width="4" height="12"/>
    <rect x="5" y="12" width="2" height="2"/>
    <rect x="5" y="15" width="2" height="2"/>
    <rect x="11" y="8" width="2" height="2"/>
    <rect x="11" y="11" width="2" height="2"/>
    <rect x="17" y="10" width="2" height="2"/>
    <rect x="17" y="13" width="2" height="2"/>
  </svg>
);

export const BalconyIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="12" width="12" height="8"/>
    <line x1="6" y1="14" x2="18" y2="14"/>
    <line x1="9" y1="12" x2="9" y2="20"/>
    <line x1="12" y1="12" x2="12" y2="20"/>
    <line x1="15" y1="12" x2="15" y2="20"/>
    <path d="M4 12 L6 12 M18 12 L20 12"/>
    <circle cx="12" cy="7" r="2"/>
  </svg>
);

export const FireplaceIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="8" width="14" height="12" rx="1"/>
    <rect x="7" y="10" width="10" height="8" rx="0.5"/>
    <path d="M12 13 C11 14 10 15 10 16 C10 17 11 18 12 18 C13 18 14 17 14 16 C14 15 13 14 12 13 Z"/>
    <rect x="4" y="7" width="16" height="1.5"/>
  </svg>
);

export const SoakingTubIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12 L5 16 C5 17 6 18 7 18 L17 18 C18 18 19 17 19 16 L19 12 Z"/>
    <path d="M7 12 L7 9 M17 12 L17 9"/>
    <path d="M3 12 L21 12"/>
    <circle cx="9" cy="6" r="1"/>
    <path d="M9 7 L9 9"/>
    <circle cx="10.5" cy="14" r="0.5"/>
    <circle cx="13.5" cy="14" r="0.5"/>
    <circle cx="12" cy="16" r="0.5"/>
  </svg>
);

// ========== ROOM AMENITIES ==========

export const WiFiIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="18" r="1"/>
    <path d="M8 13 C10 11 14 11 16 13"/>
    <path d="M5 10 C8 7 16 7 19 10"/>
    <path d="M2 7 C6 3 18 3 22 7"/>
  </svg>
);

export const SmartTVIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="12" rx="1"/>
    <line x1="8" y1="19" x2="16" y2="19"/>
    <line x1="10" y1="17" x2="10" y2="19"/>
    <line x1="14" y1="17" x2="14" y2="19"/>
    <circle cx="12" cy="14" r="0.5"/>
  </svg>
);

export const MiniFridgeIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="12" height="16" rx="1"/>
    <line x1="6" y1="10" x2="18" y2="10"/>
    <line x1="8" y1="7" x2="10" y2="7"/>
    <line x1="8" y1="13" x2="10" y2="13"/>
  </svg>
);

export const KettleIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 10 C8 10 8 16 12 16 C16 16 16 10 16 10 Z"/>
    <path d="M16 12 L18 12 C19 12 20 13 20 14 C20 15 19 16 18 16 L16 16"/>
    <path d="M10 10 L10 8 M12 10 L12 8 M14 10 L14 8"/>
    <line x1="8" y1="18" x2="16" y2="18"/>
  </svg>
);

export const PetFriendlyIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="8" cy="8" rx="2" ry="3" transform="rotate(-15 8 8)"/>
    <ellipse cx="16" cy="8" rx="2" ry="3" transform="rotate(15 16 8)"/>
    <ellipse cx="8" cy="15" rx="2" ry="3" transform="rotate(15 8 15)"/>
    <ellipse cx="16" cy="15" rx="2" ry="3" transform="rotate(-15 16 15)"/>
    <ellipse cx="12" cy="12" rx="4" ry="5"/>
  </svg>
);

export const TwoBathroomsIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="7" height="10" rx="0.5"/>
    <rect x="14" y="7" width="7" height="10" rx="0.5"/>
    <circle cx="6.5" cy="10" r="1"/>
    <rect x="5" y="13" width="3" height="2"/>
    <circle cx="17.5" cy="10" r="1"/>
    <rect x="16" y="13" width="3" height="2"/>
  </svg>
);

export const KitchenAccessIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="9" width="16" height="10" rx="1"/>
    <rect x="6" y="11" width="3" height="3"/>
    <rect x="10" y="11" width="3" height="3"/>
    <rect x="14" y="11" width="3" height="3"/>
    <circle cx="7.5" cy="16" r="0.5"/>
    <circle cx="11.5" cy="16" r="0.5"/>
    <circle cx="15.5" cy="16" r="0.5"/>
    <line x1="8" y1="6" x2="8" y2="9"/>
    <line x1="16" y1="6" x2="16" y2="9"/>
  </svg>
);

export const BluetoothSpeakerIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="6" width="8" height="12" rx="1"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="12" cy="9" r="0.5"/>
    <circle cx="12" cy="15" r="0.5"/>
    <path d="M5 9 L5 15 M19 9 L19 15"/>
  </svg>
);

export const ClimateControlIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="7" width="18" height="10" rx="1"/>
    <line x1="5" y1="10" x2="19" y2="10"/>
    <path d="M8 13 L8 14 M12 13 L12 14 M16 13 L16 14"/>
    <path d="M12 17 L12 20 M9 18 L9 19 M15 18 L15 19"/>
  </svg>
);

// ========== SPECIAL ROOM FEATURES ==========

export const SunriseIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <line x1="12" y1="3" x2="12" y2="6"/>
    <line x1="12" y1="18" x2="12" y2="21"/>
    <line x1="3" y1="12" x2="6" y2="12"/>
    <line x1="18" y1="12" x2="21" y2="12"/>
    <line x1="5" y1="5" x2="7" y2="7"/>
    <line x1="17" y1="17" x2="19" y2="19"/>
    <line x1="5" y1="19" x2="7" y2="17"/>
    <line x1="17" y1="7" x2="19" y2="5"/>
    <line x1="3" y1="20" x2="21" y2="20"/>
  </svg>
);

export const SleepsFourIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="5" r="1.5"/>
    <path d="M4 10 C4 8.5 5.5 8 7 8 C8.5 8 10 8.5 10 10 L10 13 L4 13 Z"/>
    <circle cx="17" cy="5" r="1.5"/>
    <path d="M14 10 C14 8.5 15.5 8 17 8 C18.5 8 20 8.5 20 10 L20 13 L14 13 Z"/>
    <circle cx="7" cy="15" r="1"/>
    <path d="M5 18 C5 17 6 16.5 7 16.5 C8 16.5 9 17 9 18 L9 20 L5 20 Z"/>
    <circle cx="17" cy="15" r="1"/>
    <path d="M15 18 C15 17 16 16.5 17 16.5 C18 16.5 19 17 19 18 L19 20 L15 20 Z"/>
  </svg>
);

export const SleepsSixIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="4" r="1.2"/>
    <path d="M4 8 C4 7 5 6.5 6 6.5 C7 6.5 8 7 8 8 L8 10 L4 10 Z"/>
    <circle cx="12" cy="4" r="1.2"/>
    <path d="M10 8 C10 7 11 6.5 12 6.5 C13 6.5 14 7 14 8 L14 10 L10 10 Z"/>
    <circle cx="18" cy="4" r="1.2"/>
    <path d="M16 8 C16 7 17 6.5 18 6.5 C19 6.5 20 7 20 8 L20 10 L16 10 Z"/>
    <circle cx="6" cy="13" r="1.2"/>
    <path d="M4 17 C4 16 5 15.5 6 15.5 C7 15.5 8 16 8 17 L8 19 L4 19 Z"/>
    <circle cx="12" cy="13" r="1.2"/>
    <path d="M10 17 C10 16 11 15.5 12 15.5 C13 15.5 14 16 14 17 L14 19 L10 19 Z"/>
    <circle cx="18" cy="13" r="1.2"/>
    <path d="M16 17 C16 16 17 15.5 18 15.5 C19 15.5 20 16 20 17 L20 19 L16 19 Z"/>
  </svg>
);

export const PrivateRestroomIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="7" width="12" height="13" rx="1"/>
    <circle cx="12" cy="11" r="1.5"/>
    <path d="M10 13 C10 12.5 11 12 12 12 C13 12 14 12.5 14 13 L14 16 L10 16 Z"/>
    <line x1="9" y1="4" x2="15" y2="4"/>
    <line x1="12" y1="4" x2="12" y2="7"/>
  </svg>
);

export const QueenWithTrundleIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="6" width="16" height="6" rx="0.5"/>
    <rect x="3" y="4" width="18" height="2" rx="0.5"/>
    <path d="M8 4 L8 2 L10 2 L10 4 M14 4 L14 2 L16 2 L16 4"/>
    <rect x="6" y="7.5" width="5" height="1.5" rx="0.3"/>
    <rect x="13" y="7.5" width="5" height="1.5" rx="0.3"/>
    <rect x="5" y="14" width="14" height="4" rx="0.5"/>
    <rect x="4" y="12" width="16" height="2" rx="0.5"/>
    <line x1="7" y1="15.5" x2="9" y2="15.5" strokeWidth="1.5"/>
    <line x1="15" y1="15.5" x2="17" y2="15.5" strokeWidth="1.5"/>
  </svg>
);

// ========== EVENT SPACE TYPES ==========

export const TheYardIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 20 L3 12 L7 12 L7 20 M9 20 L9 8 L13 8 L13 20 M15 20 L15 10 L19 10 L19 20"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
    <circle cx="5" cy="5" r="2"/>
    <path d="M8 4 L10 3 L9 6 L11 5"/>
  </svg>
);

export const GreenhausIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="8" width="14" height="12" rx="1" strokeWidth="2"/>
    <path d="M5 8 L12 3 L19 8"/>
    <circle cx="9" cy="12" r="1.5"/>
    <path d="M9 13.5 L9 16"/>
    <circle cx="15" cy="14" r="1.5"/>
    <path d="M15 15.5 L15 18"/>
    <path d="M12 10 L12 13 M11 11 L13 11"/>
  </svg>
);

export const ConferenceRoomIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="6" width="16" height="10" rx="1"/>
    <rect x="7" y="9" width="10" height="4"/>
    <line x1="12" y1="16" x2="12" y2="18"/>
    <line x1="8" y1="18" x2="16" y2="18"/>
  </svg>
);

export const CampDeckIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 L4 16 L20 16 Z"/>
    <path d="M12 3 L12 16"/>
    <path d="M8.5 16 L8.5 11 L15.5 11 L15.5 16" fill="white"/>
    <line x1="2" y1="18" x2="22" y2="18"/>
  </svg>
);

export const HammockHooksIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8 C8 12 16 12 20 8"/>
    <path d="M4 12 C8 16 16 16 20 12"/>
    <circle cx="4" cy="6" r="1"/>
    <circle cx="20" cy="6" r="1"/>
  </svg>
);

// ========== EVENT FEATURES ==========

export const OutdoorSpaceIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/>
    <path d="M6 9 L6 20 M3 11 L9 11"/>
    <path d="M12 8 Q14 4 16 8 T20 8"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);

export const IndoorSpaceIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="7" width="16" height="13"/>
    <path d="M4 7 L12 3 L20 7"/>
    <rect x="9" y="12" width="6" height="8"/>
    <rect x="6" y="10" width="3" height="3"/>
    <rect x="15" y="10" width="3" height="3"/>
  </svg>
);

export const NaturalLightIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <line x1="12" y1="3" x2="12" y2="7"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <line x1="3" y1="12" x2="7" y2="12"/>
    <line x1="17" y1="12" x2="21" y2="12"/>
    <line x1="5" y1="5" x2="8" y2="8"/>
    <line x1="16" y1="16" x2="19" y2="19"/>
    <line x1="5" y1="19" x2="8" y2="16"/>
    <line x1="16" y1="8" x2="19" y2="5"/>
  </svg>
);

export const YardGamesIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="14" width="3" height="6"/>
    <rect x="10" y="10" width="3" height="10"/>
    <rect x="16" y="12" width="3" height="8"/>
    <circle cx="6.5" cy="12" r="1.5"/>
    <circle cx="11.5" cy="8" r="1.5"/>
    <circle cx="17.5" cy="10" r="1.5"/>
  </svg>
);

export const PlantFilledIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10 C7 8 8 6 10 6 C8 6 7 4 7 2 C7 4 6 6 4 6 C6 6 7 8 7 10 Z"/>
    <path d="M17 9 C17 7 18 5 20 5 C18 5 17 3 17 1 C17 3 16 5 14 5 C16 5 17 7 17 9 Z"/>
    <rect x="9" y="10" width="6" height="8" rx="1"/>
    <path d="M11 10 L11 7 M13 10 L13 7"/>
    <rect x="8" y="18" width="8" height="2" rx="1"/>
  </svg>
);

export const AVEquipmentIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="12" rx="1"/>
    <path d="M8 10 L8 14 L13 11 Z"/>
    <circle cx="17" cy="12" r="1"/>
  </svg>
);

export const BoseSpeakerIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="3" width="10" height="18" rx="1"/>
    <circle cx="12" cy="8" r="2"/>
    <circle cx="12" cy="15" r="3"/>
    <circle cx="12" cy="15" r="1"/>
  </svg>
);

export const FullBarServiceIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8 L12 18 L19 8 Z"/>
    <line x1="12" y1="18" x2="12" y2="21"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <circle cx="12" cy="13" r="1"/>
    <line x1="5" y1="8" x2="19" y2="8"/>
  </svg>
);

export const CateringAvailableIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 7 L12 12 L16 14"/>
    <path d="M7 3 L7 9 M5 5 L9 5"/>
    <rect x="17" y="3" width="2" height="6" rx="1"/>
    <path d="M18 9 L18 12"/>
  </svg>
);

// ========== CAPACITY ICONS ==========

export const Capacity10Icon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="6" r="1.5"/>
    <path d="M5 12 C5 10 7 9 9 9 C11 9 13 10 13 12 L13 16 L5 16 Z"/>
    <circle cx="15" cy="6" r="1.5"/>
    <path d="M15 9 C17 9 19 10 19 12 L19 16 L13 16"/>
  </svg>
);

export const Capacity50Icon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="5" r="1"/>
    <path d="M8 7 L8 10 L6 10 L6 12 L10 12 L10 10 L8 10"/>
    <circle cx="16" cy="5" r="1"/>
    <path d="M16 7 L16 10 L14 10 L14 12 L18 12 L18 10 L16 10"/>
    <text x="12" y="18" textAnchor="middle" fontSize="6" stroke="none" fill="currentColor">50</text>
  </svg>
);

export const Capacity200Icon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="1.5"/>
    <path d="M8 11 C8 9 10 8 12 8 C14 8 16 9 16 11"/>
    <circle cx="6" cy="8" r="1"/>
    <path d="M3 12 C3 11 4.5 10 6 10 C7.5 10 9 11 9 12"/>
    <circle cx="18" cy="8" r="1"/>
    <path d="M15 12 C15 11 16.5 10 18 10 C19.5 10 21 11 21 12"/>
    <text x="12" y="19" textAnchor="middle" fontSize="5" stroke="none" fill="currentColor">200</text>
  </svg>
);

// ========== ICON MAPPING HELPER ==========

// New comprehensive amenity icons
export const FastWiFiIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="15" r="1"/>
    <path d="M8 12 Q12 8, 16 12" fill="none" strokeWidth="2.5"/>
    <path d="M6 9 Q12 4, 18 9" fill="none" strokeWidth="2"/>
    <path d="M4 6 Q12 0, 20 6" fill="none" strokeWidth="1.5"/>
    <path d="M7 14 L9 11 L7 11 L9 8" fill="none" strokeWidth="1.5" opacity="0.8"/>
    <path d="M17 14 L15 11 L17 11 L15 8" fill="none" strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

export const AdjustableDeskIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="8" width="16" height="1.5" rx="0.3"/>
    <line x1="6" y1="9.5" x2="6" y2="16"/>
    <line x1="18" y1="9.5" x2="18" y2="16"/>
    <path d="M8 14 L8 11 M7 12 L8 11 L9 12" opacity="0.7"/>
    <path d="M16 11 L16 14 M15 13 L16 14 L17 13" opacity="0.7"/>
    <rect x="9" y="5" width="6" height="4" rx="0.3"/>
    <rect x="8" y="8" width="8" height="0.5" rx="0.2"/>
    <rect x="14" y="11" width="3" height="2" rx="0.3"/>
    <circle cx="15" cy="12" r="0.3"/>
    <circle cx="16" cy="12" r="0.3"/>
  </svg>
);

export const SittingAreaIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="10" height="5" rx="0.5"/>
    <rect x="2" y="13" width="12" height="4" rx="0.5"/>
    <rect x="2" y="17" width="2" height="2" rx="0.3"/>
    <rect x="12" y="17" width="2" height="2" rx="0.3"/>
    <rect x="15" y="13" width="4" height="1" rx="0.2"/>
    <line x1="16" y1="14" x2="16" y2="18"/>
    <line x1="18" y1="14" x2="18" y2="18"/>
    <path d="M20 10 L20 14 L22 14 L22 11 Q22 10, 21 10 Z"/>
    <line x1="20" y1="14" x2="20" y2="17"/>
    <line x1="22" y1="14" x2="22" y2="17"/>
  </svg>
);

export const WhiteboardIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="12" rx="0.5"/>
    <rect x="4" y="6" width="16" height="10" fill="white" stroke="currentColor"/>
    <line x1="6" y1="9" x2="11" y2="9" opacity="0.6"/>
    <line x1="6" y1="11" x2="14" y2="11" opacity="0.6"/>
    <line x1="6" y1="13" x2="9" y2="13" opacity="0.6"/>
    <path d="M16 9 L17 10 L19 8" strokeWidth="1.5" opacity="0.7"/>
    <rect x="12" y="14" width="4" height="1" rx="0.2" transform="rotate(-30 14 14.5)"/>
    <circle cx="13" cy="14.5" r="0.3"/>
    <rect x="3" y="17" width="18" height="1" rx="0.3"/>
  </svg>
);

export const getRoomIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();

  // Bed types - PRIORITY: Check trundle BEFORE queen bed
  if (lowerFeature.includes('queen') && lowerFeature.includes('trundle')) return QueenWithTrundleIcon;
  if (lowerFeature.includes('queen') && lowerFeature.includes('platform')) return QueenBedIcon;
  if (lowerFeature.includes('king bed') || lowerFeature === 'king bed') return KingBedIcon;
  if (lowerFeature.includes('queen bed') || lowerFeature === 'queen bed') return QueenBedIcon;
  if (lowerFeature.includes('two queen') || lowerFeature.includes('double queen') || lowerFeature.includes('two beds')) return TwoQueensIcon;
  if (lowerFeature.includes('bunk')) return BunkBedsIcon;

  // Capacity - Check for specific sleep counts
  if (lowerFeature.includes('sleeps 6') || lowerFeature.includes('sleeps six')) return SleepsSixIcon;
  if (lowerFeature.includes('sleeps 4') || lowerFeature.includes('sleeps four')) return SleepsFourIcon;

  // Views - PRIORITY: Check sunrise BEFORE generic mountain/city views
  if (lowerFeature.includes('sunrise')) return SunriseIcon;
  if (lowerFeature.includes('mountain views') || lowerFeature.includes('mountain view')) return MountainViewIcon;
  if (lowerFeature.includes('city') && lowerFeature.includes('view')) return CityViewIcon;
  if (lowerFeature.includes('panoramic')) return MountainViewIcon;
  if (lowerFeature.includes('premium') && lowerFeature.includes('view')) return MountainViewIcon;

  // Room features - Balcony and Outdoor
  if (lowerFeature.includes('spacious outdoor balcony') || lowerFeature.includes('full balcony') || lowerFeature.includes('balcony')) return BalconyIcon;
  if (lowerFeature.includes('fireplace') || lowerFeature.includes('soothing fireplace')) return FireplaceIcon;
  if (lowerFeature.includes('soaking') || lowerFeature.includes('soaking tub') || lowerFeature.includes('free standing')) return SoakingTubIcon;
  if (lowerFeature.includes('two bathroom') || lowerFeature.includes('bathrooms')) return TwoBathroomsIcon;
  if (lowerFeature.includes('private restroom') || lowerFeature.includes('private in room restroom') || lowerFeature === 'restroom') return PrivateRestroomIcon;
  if (lowerFeature.includes('tub') || lowerFeature.includes('bath')) return SoakingTubIcon;
  if (lowerFeature.includes('kitchen access')) return KitchenAccessIcon;
  if (lowerFeature.includes('pet friendly') || lowerFeature.includes('pet')) return PetFriendlyIcon;
  if (lowerFeature.includes('outdoor') && (lowerFeature.includes('deck') || lowerFeature.includes('camping'))) return OutdoorSpaceIcon;
  if (lowerFeature.includes('hammock')) return HammockHooksIcon;

  // Premium Amenities - EXACT MATCHES FIRST
  if (lowerFeature === 'tuft and needle mattress') return PremiumMattressIcon;
  if (lowerFeature === 'brooklinen sheets and towels') return LuxuryLinensIcon;
  if (lowerFeature.includes('contactless') || (lowerFeature.includes('no key card'))) return ContactlessEntryIcon;
  if (lowerFeature === 'overhead garage door') return OverheadDoorIcon;
  if (lowerFeature === 'kettle, microwave, mini chiller' || lowerFeature === 'kettle and mini chiller') return KitchenetteIcon;
  if (lowerFeature.includes('blackout curtain')) return BlackoutCurtainsIcon;
  if (lowerFeature === '50" hd smart tv') return SmartTVIcon;
  if (lowerFeature === 'freaky fast wifi') return FastWiFiIcon;
  if (lowerFeature === 'sit or stand built in desk' || lowerFeature.includes('adjustable desk')) return AdjustableDeskIcon;
  if (lowerFeature === 'sitting area with couch, table, chairs' || lowerFeature.includes('sitting area')) return SittingAreaIcon;
  if (lowerFeature === 'whiteboard') return WhiteboardIcon;

  // Family Suite & Camp Deck Specific Icons
  if (lowerFeature === '4 twin beds' || lowerFeature.includes('four twin beds')) return FourTwinBedsIcon;
  if (lowerFeature.includes('programmable') && lowerFeature.includes('lockers')) return SmartLockersIcon;
  if (lowerFeature.includes('8 programmable custom built lockers')) return SmartLockersIcon;
  if (lowerFeature.includes('flat turf camping') || lowerFeature.includes('bring your own sleeping gear')) return TurfCampingIcon;
  if (lowerFeature.includes('available to rent as a meeting space')) return MeetingSpaceIcon;
  if (lowerFeature.includes('table and chairs') && lowerFeature.toLowerCase().includes('camp')) return MeetingSpaceIcon;

  // Fallback for partial matches
  if (lowerFeature.includes('mattress')) return PremiumMattressIcon;
  if (lowerFeature.includes('sheets') || lowerFeature.includes('towels') || lowerFeature.includes('brooklinen')) return LuxuryLinensIcon;
  if (lowerFeature.includes('overhead') || lowerFeature.includes('garage door')) return OverheadDoorIcon;
  if (lowerFeature.includes('kettle') || lowerFeature.includes('microwave') || lowerFeature.includes('mini chiller') || lowerFeature.includes('fridge')) return KitchenetteIcon;
  if (lowerFeature.includes('smart tv') || lowerFeature.includes('tv')) return SmartTVIcon;
  if (lowerFeature.includes('wifi') || lowerFeature.includes('fast wifi')) return FastWiFiIcon;
  if (lowerFeature.includes('desk') || lowerFeature.includes('charging')) return AdjustableDeskIcon;

  // Amenities & design
  if (lowerFeature.includes('speaker') || lowerFeature.includes('bluetooth')) return BluetoothSpeakerIcon;
  if (lowerFeature.includes('climate') || lowerFeature.includes('air')) return ClimateControlIcon;

  // Qualitative features - Priority Universal Icons
  if (lowerFeature.includes('spacious layout') || lowerFeature.includes('extra space')) return SpaciousLayoutIcon;
  if (lowerFeature.includes('boutique') || lowerFeature.includes('modern') || lowerFeature.includes('design') || lowerFeature.includes('art')) return BoutiqueDesignIcon;
  if (lowerFeature.includes('executive') || lowerFeature.includes('premium amenities') || lowerFeature.includes('luxury')) return PremiumAmenitiesIcon;
  if (lowerFeature.includes('essentials') || lowerFeature.includes('handpicked')) return BoutiqueDesignIcon;
  if (lowerFeature.includes('smart') || lowerFeature.includes('compact') || lowerFeature.includes('urban') || lowerFeature.includes('convenience')) return SmartAmenitiesIcon;
  if (lowerFeature.includes('family')) return FamilyFriendlyIcon;

  return null;
};

// ========== PREMIUM AMENITY ICONS (King Suite Spec) ==========

export const PremiumMattressIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="12" width="18" height="3" rx="0.5"/>
    <rect x="3" y="15" width="18" height="3" rx="0.5"/>
    <rect x="3" y="18" width="18" height="3" rx="0.5"/>
    <circle cx="6" cy="13.5" r="0.3"/>
    <circle cx="9" cy="13.5" r="0.3"/>
    <circle cx="12" cy="13.5" r="0.3"/>
    <circle cx="15" cy="13.5" r="0.3"/>
    <circle cx="18" cy="13.5" r="0.3"/>
    <path d="M8 8 L10 8 L8 10 L10 10 M10.5 6 L12 6 L10.5 7.5 L12 7.5"/>
  </svg>
);

export const LuxuryLinensIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="14" width="14" height="4" rx="0.5"/>
    <rect x="5" y="10" width="14" height="4" rx="0.5"/>
    <rect x="5" y="6" width="14" height="4" rx="0.5"/>
    <line x1="7" y1="8" x2="17" y2="8" strokeDasharray="1 1" opacity="0.5"/>
    <line x1="7" y1="12" x2="17" y2="12" strokeDasharray="1 1" opacity="0.5"/>
    <line x1="7" y1="16" x2="17" y2="16" strokeDasharray="1 1" opacity="0.5"/>
  </svg>
);

export const ContactlessEntryIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="4" width="10" height="16" rx="1"/>
    <circle cx="12" cy="17" r="1"/>
    <path d="M10 10 Q8 8, 10 6" fill="none"/>
    <path d="M12 10 Q10 8, 12 6" fill="none"/>
    <path d="M14 10 Q12 8, 14 6" fill="none"/>
    <rect x="17" y="11" width="5" height="4" rx="0.5"/>
    <path d="M18 11 L18 9 Q19.5 7, 21 9 L21 11"/>
  </svg>
);

export const OverheadDoorIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="8" x2="3" y2="20"/>
    <line x1="21" y1="8" x2="21" y2="20"/>
    <line x1="3" y1="20" x2="21" y2="20"/>
    <rect x="4" y="8" width="16" height="3" rx="0.3"/>
    <rect x="4" y="11.5" width="16" height="3" rx="0.3"/>
    <rect x="4" y="15" width="16" height="3" rx="0.3"/>
    <path d="M12 5 L12 7 M10 6 L12 5 L14 6" opacity="0.6"/>
  </svg>
);

export const KitchenetteIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7" cy="13" r="3"/>
    <path d="M10 13 Q11 13, 11 11"/>
    <path d="M7 10 L7 8"/>
    <rect x="13" y="10" width="8" height="6" rx="0.5"/>
    <rect x="14" y="11" width="5" height="3" rx="0.3"/>
    <circle cx="19.5" cy="12" r="0.3"/>
    <rect x="6" y="17" width="12" height="4" rx="0.5"/>
    <line x1="6" y1="19" x2="18" y2="19"/>
  </svg>
);

export const BlackoutCurtainsIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="0.5"/>
    <path d="M4 4 L4 20 L11 20 L11 4" fill="currentColor" opacity="0.2"/>
    <path d="M13 4 L13 20 L20 20 L20 4" fill="currentColor" opacity="0.2"/>
    <line x1="6" y1="4" x2="6" y2="20" opacity="0.4"/>
    <line x1="8" y1="4" x2="8" y2="20" opacity="0.4"/>
    <line x1="10" y1="4" x2="10" y2="20" opacity="0.4"/>
    <line x1="14" y1="4" x2="14" y2="20" opacity="0.4"/>
    <line x1="16" y1="4" x2="16" y2="20" opacity="0.4"/>
    <line x1="18" y1="4" x2="18" y2="20" opacity="0.4"/>
    <circle cx="12" cy="10" r="2" strokeDasharray="2 1" opacity="0.3"/>
  </svg>
);

export const FourTwinBedsIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="8" height="5" rx="0.3"/>
    <rect x="4" y="5.5" width="6" height="1" rx="0.2" opacity="0.6"/>
    <rect x="13" y="5" width="8" height="5" rx="0.3"/>
    <rect x="14" y="5.5" width="6" height="1" rx="0.2" opacity="0.6"/>
    <rect x="3" y="12" width="8" height="5" rx="0.3"/>
    <rect x="4" y="12.5" width="6" height="1" rx="0.2" opacity="0.6"/>
    <rect x="13" y="12" width="8" height="5" rx="0.3"/>
    <rect x="14" y="12.5" width="6" height="1" rx="0.2" opacity="0.6"/>
    <circle cx="12" cy="11" r="1.5" fill="white" stroke="currentColor"/>
    <path d="M11.5 10.5 L11.5 11.5 L12.5 11.5 M12.5 10.5 L12.5 11.5" strokeWidth="0.8"/>
  </svg>
);

export const SmartLockersIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="0.5"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
    <line x1="8" y1="4" x2="8" y2="20"/>
    <line x1="16" y1="4" x2="16" y2="20"/>
    <line x1="4" y1="8" x2="20" y2="8"/>
    <line x1="4" y1="12" x2="20" y2="12"/>
    <line x1="4" y1="16" x2="20" y2="16"/>
    <rect x="5.5" y="5.5" width="1" height="1" rx="0.1" fill="currentColor" opacity="0.7"/>
    <rect x="5.5" y="9.5" width="1" height="1" rx="0.1" fill="currentColor" opacity="0.7"/>
    <rect x="5.5" y="13.5" width="1" height="1" rx="0.1" fill="currentColor" opacity="0.7"/>
    <rect x="5.5" y="17.5" width="1" height="1" rx="0.1" fill="currentColor" opacity="0.7"/>
    <path d="M10 6 L9 7 L10.5 7 L9.5 7.5" strokeWidth="0.8" opacity="0.6"/>
    <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity="0.3"/>
    <path d="M17.5 17.5 Q17.5 17, 18 17 Q18.5 17, 18.5 17.5 Q18.5 18, 18 18 Q17.5 18, 17.5 18.5 Q17.5 19, 18 19 Q18.5 19, 18.5 18.5" strokeWidth="0.8"/>
  </svg>
);

export const TurfCampingIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="16" width="18" height="3" rx="0.5" fill="currentColor" opacity="0.3"/>
    <line x1="5" y1="16" x2="5" y2="19" opacity="0.4"/>
    <line x1="7" y1="16" x2="7" y2="19" opacity="0.4"/>
    <line x1="9" y1="16" x2="9" y2="19" opacity="0.4"/>
    <line x1="11" y1="16" x2="11" y2="19" opacity="0.4"/>
    <line x1="13" y1="16" x2="13" y2="19" opacity="0.4"/>
    <line x1="15" y1="16" x2="15" y2="19" opacity="0.4"/>
    <line x1="17" y1="16" x2="17" y2="19" opacity="0.4"/>
    <line x1="19" y1="16" x2="19" y2="19" opacity="0.4"/>
    <path d="M12 7 L7 15 L17 15 Z" strokeDasharray="2 1"/>
    <path d="M12 7 L12 15" strokeDasharray="2 1"/>
    <circle cx="5" cy="5" r="0.4"/>
    <circle cx="19" cy="4" r="0.4"/>
    <circle cx="20" cy="8" r="0.4"/>
    <path d="M10 12 Q12 11, 14 12" strokeDasharray="1 0.5" opacity="0.6"/>
  </svg>
);

export const MeetingSpaceIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="13" rx="7" ry="3"/>
    <rect x="5" y="11" width="2" height="3" rx="0.3"/>
    <rect x="17" y="11" width="2" height="3" rx="0.3"/>
    <rect x="8" y="10" width="2" height="2.5" rx="0.3"/>
    <rect x="14" y="10" width="2" height="2.5" rx="0.3"/>
    <rect x="8" y="14" width="2" height="2.5" rx="0.3"/>
    <rect x="14" y="14" width="2" height="2.5" rx="0.3"/>
    <rect x="9" y="4" width="6" height="4" rx="0.3"/>
    <line x1="12" y1="8" x2="12" y2="9"/>
    <rect x="18" y="5" width="3" height="3" rx="0.3" opacity="0.7"/>
    <circle cx="19" cy="6.5" r="0.3"/>
    <circle cx="20" cy="6.5" r="0.3"/>
  </svg>
);

export const getEventIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();

  // Venue types
  if (lowerFeature.includes('yard')) return TheYardIcon;
  if (lowerFeature.includes('greenhaus') || lowerFeature.includes('greenhouse')) return GreenhausIcon;
  if (lowerFeature.includes('conference')) return ConferenceRoomIcon;
  if (lowerFeature.includes('camp') || lowerFeature.includes('deck')) return CampDeckIcon;

  // Features
  if (lowerFeature.includes('outdoor')) return OutdoorSpaceIcon;
  if (lowerFeature.includes('indoor')) return IndoorSpaceIcon;
  if (lowerFeature.includes('natural light') || lowerFeature.includes('light')) return NaturalLightIcon;
  if (lowerFeature.includes('mountain') && lowerFeature.includes('view')) return MountainViewIcon;
  if (lowerFeature.includes('games')) return YardGamesIcon;
  if (lowerFeature.includes('plant')) return PlantFilledIcon;
  if (lowerFeature.includes('hammock')) return HammockHooksIcon;

  // Services
  if (lowerFeature.includes('av') || lowerFeature.includes('a/v') || lowerFeature.includes('audio')) return AVEquipmentIcon;
  if (lowerFeature.includes('speaker') || lowerFeature.includes('bose')) return BoseSpeakerIcon;
  if (lowerFeature.includes('bar')) return FullBarServiceIcon;
  if (lowerFeature.includes('catering') || lowerFeature.includes('food')) return CateringAvailableIcon;
  if (lowerFeature.includes('tv') || lowerFeature.includes('screen')) return SmartTVIcon;

  // Capacity
  if (lowerFeature.match(/\b10\b/) || lowerFeature.includes('2-10') || lowerFeature.includes('up to 10')) return Capacity10Icon;
  if (lowerFeature.match(/\b50\b/) || lowerFeature.includes('up to 50')) return Capacity50Icon;
  if (lowerFeature.match(/\b200\b/) || lowerFeature.includes('up to 200')) return Capacity200Icon;

  return null;
};
