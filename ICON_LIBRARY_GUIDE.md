# Kinship Landing Icon Library Guide

## Complete Icon Suite for Rooms & Events

This document serves as the master reference for all icons used across the Kinship Landing website. All icons are stored in `/components/ui/RoomIcons.tsx` and follow consistent brand guidelines.

---

## Brand Colors for Icons

- **Primary**: `#849e74` (Kinship Green) - Default icon color
- **Hover/Active**: `#667C58` (Green Dark)
- **Accent**: `#A47864` (Mocha Mousse)
- **HOMA Accent**: `#D4A574` (HOMA Sand)

---

## Room Amenity Icons (13 Total)

### Premium Sleep & Comfort
1. **Premium Mattress** (`PremiumMattressIcon`)
   - Label: "Tuft & Needle Mattress"
   - Use for: King Suite, Mountain King Suite, Executive King Suite
   - Visual: Layered mattress with comfort dots and sleep Z's

2. **Luxury Linens** (`LuxuryLinensIcon`)
   - Label: "Brooklinen sheets and towels"
   - Use for: All premium suites
   - Visual: Folded linens with thread detail

### Entry & Access
3. **Contactless Entry** (`ContactlessEntryIcon`)
   - Label: "Contactless entry (no key card)"
   - Use for: Modern suites (when applicable)
   - Visual: Phone with wireless waves and lock icon

### Room Features
4. **Overhead Garage Door** (`OverheadDoorIcon`)
   - Label: "Overhead Garage Door"
   - Use for: King Suite, Mountain King Suite, Executive King Suite
   - Visual: Sectioned garage door with motion arrows

5. **Soothing Fireplace** (`FireplaceIcon`)
   - Label: "Soothing Fireplace"
   - Use for: King Suite, Mountain King Suite
   - Visual: Fireplace frame with flames and logs

6. **Free Standing Soaking Tub** (`SoakingTubIcon`)
   - Label: "Free Standing Soaking Tub"
   - Use for: King Suite, Mountain King Suite
   - Visual: Elegant tub with bubbles and faucet

### Kitchen Amenities
7. **Kitchenette** (`KitchenetteIcon`)
   - Label: "Kettle, Microwave, Mini Chiller"
   - Use for: All suites with in-room amenities
   - Visual: Kettle, microwave, and mini fridge combo

### Window Treatments
8. **Blackout Curtains** (`BlackoutCurtainsIcon`)
   - Label: "Blackout curtains"
   - Use for: Rooms emphasizing sleep quality
   - Visual: Curtain folds with blocked moon

### Technology
9. **Smart TV** (`SmartTVIcon`)
   - Label: '50" HD smart TV'
   - Use for: All modern suites
   - Visual: TV screen with stand and WiFi symbol

10. **Freaky Fast WiFi** (`FastWiFiIcon`)
    - Label: "Freaky fast Wifi"
    - Use for: All rooms
    - Visual: WiFi waves with lightning bolts for speed

### Executive Amenities
11. **Adjustable Desk** (`AdjustableDeskIcon`)
    - Label: "Adjustable desk with charging port"
    - Use for: Executive King Suite
    - Visual: Sit/stand desk with height adjustment arrows and charging outlets

12. **Sitting Area** (`SittingAreaIcon`)
    - Label: "Sitting area with couch, table, chairs"
    - Use for: Executive King Suite, larger suites
    - Visual: Couch, side table, and chair ensemble

13. **Whiteboard** (`WhiteboardIcon`)
    - Label: "Whiteboard"
    - Use for: Executive King Suite
    - Visual: Board with writing, checkmark, and marker

---

## Room Type Icons (7 Total)

1. **King Suite** (`KingBedIcon`)
   - Visual: King bed with headboard posts and crown detail

2. **Queen Suite** (`QueenBedIcon`)
   - Visual: Queen bed with headboard posts

3. **Double Queens** (`TwoQueensIcon`)
   - Visual: Two queen beds side-by-side

4. **Junior Suite** (`QueenBedIcon` smaller variant)
   - Visual: Compact queen bed design

5. **Family Suite** (`FamilyFriendlyIcon`)
   - Visual: Queen bed with bunk beds

6. **Queen + Bunk** (`QueenWithTrundleIcon`)
   - Visual: Queen bed with overhead bunk

7. **Camp Deck** (`CampDeckIcon`)
   - Visual: Tent with stars and ground

---

## Icon Usage in Room Data

### Example: Mountain King Suite
```typescript
features: [
  'Tuft and Needle Mattress',           // → PremiumMattressIcon
  'Brooklinen sheets and towels',       // → LuxuryLinensIcon
  'Overhead Garage Door',                // → OverheadDoorIcon
  'Soothing Fireplace',                  // → FireplaceIcon
  'Free Standing Soaking Tub',          // → SoakingTubIcon
  'Kettle, Microwave, Mini Chiller',    // → KitchenetteIcon
  '50" HD smart TV',                     // → SmartTVIcon
  'Freaky fast Wifi'                     // → FastWiFiIcon
]
```

### Example: Executive King Suite
```typescript
features: [
  'Tuft and Needle Mattress',                      // → PremiumMattressIcon
  'Brooklinen sheets and towels',                  // → LuxuryLinensIcon
  'Adjustable desk with charging port',            // → AdjustableDeskIcon
  'Sitting area with couch, table, chairs',        // → SittingAreaIcon
  'Whiteboard',                                     // → WhiteboardIcon
  'Overhead Garage Door to Mountain View',         // → OverheadDoorIcon
  'Kettle, Microwave, Mini Chiller',              // → KitchenetteIcon
  '50" HD smart TV',                               // → SmartTVIcon
  'Freaky fast Wifi'                               // → FastWiFiIcon
]
```

---

## Icon Matching Logic

The `getRoomIcon()` function in `RoomIcons.tsx` automatically matches feature strings to icons using smart keyword detection:

### Priority Matching (checks first)
1. **Exact phrases**: "Tuft and Needle", "Brooklinen", "Freaky fast Wifi"
2. **Compound features**: "Queen + trundle" (before generic "queen")
3. **Multi-word combinations**: "Adjustable desk", "Sitting area"

### Fallback Matching
- Single keywords: "mattress", "fireplace", "tv", "wifi"
- Partial matches: "soaking tub" OR just "tub"

---

## Technical Specifications

### SVG Standards
- **ViewBox**: `0 0 24 24` (24x24px base grid)
- **Stroke Width**: `2px` (scales proportionally)
- **Stroke Linecap**: `round` (friendly endpoints)
- **Stroke Linejoin**: `round` (smooth corners)
- **Corner Radius**: `0.3-1px` (consistent roundness)
- **Fill**: `none` (stroke-based for flexibility)

### CSS Classes
```tsx
className="kinship-icon" // Base class for consistent styling
```

### Color Application
Icons use `stroke="currentColor"` which allows color control via CSS:

```css
.icon-container {
  color: #849e74; /* Kinship Green */
}

.icon-container:hover {
  color: #667C58; /* Green Dark */
}
```

---

## Component Usage Examples

### Basic Icon Display
```tsx
import { RoomIcon } from '@/components/ui/RoomIcons';

<RoomIcon
  name="premium-mattress"
  size={24}
  color="#849e74"
/>
```

### Amenity List Item
```tsx
import { AmenityItem } from '@/components/ui/RoomIcons';

<AmenityItem
  iconName="fast-wifi"
  iconSize={20}
  iconColor="#667C58"
/>
```

### Auto-Matched from Feature String
```tsx
import { getRoomIcon } from '@/components/ui/RoomIcons';

const IconComponent = getRoomIcon('Tuft and Needle Mattress');
if (IconComponent) {
  <IconComponent className="w-6 h-6" />
}
```

---

## Room-Specific Icon Combinations

### Luxury Suites (King, Mountain King)
**Emphasis**: Relaxation & comfort
- Premium Mattress + Luxury Linens
- Overhead Door + Fireplace + Soaking Tub
- Kitchenette + Smart TV + Fast WiFi

### Executive Suite
**Emphasis**: Productivity & space
- Premium Mattress + Luxury Linens
- Adjustable Desk + Sitting Area + Whiteboard
- Overhead Door + Kitchenette + Smart TV + Fast WiFi

### Junior/Queen Suites
**Emphasis**: Efficiency & value
- Luxury Linens + City/Mountain Views
- Smart TV + Fast WiFi + Boutique Design

### Family Suite
**Emphasis**: Space & functionality
- Queen + Bunks + Two Bathrooms
- Kitchen Access + Sleeps 6

---

## Export Formats

### For Web (Recommended)
- **Format**: Inline SVG in React components
- **Benefits**: Instant color changes, perfect scaling, no HTTP requests

### For Print/Marketing
- **Format**: SVG export at 24x24px
- **Format**: PNG at 2x (48x48px) for retina displays
- **Colors**: Use brand palette hex values

---

## Future Icon Additions

When adding new icons:

1. **Design**: Follow 24x24px grid, 2px stroke, round caps/joins
2. **Naming**: Use descriptive PascalCase + "Icon" suffix
3. **Add to**: `/components/ui/RoomIcons.tsx`
4. **Update**: `getRoomIcon()` matching logic
5. **Document**: Add to this guide with label and use cases
6. **Test**: Verify auto-matching with feature strings

---

## Accessibility

All icons include:
- `aria-label` with descriptive text
- Semantic meaning (not decorative)
- Sufficient color contrast (4.5:1 minimum)
- Scale gracefully from 16px to 48px+

---

## Version History

- **v1.0** (2025-01-23): Initial comprehensive icon suite with 13 amenity icons and 7 room type icons
- **v1.1** (2025-01-23): Added Executive Suite icons (Adjustable Desk, Sitting Area, Whiteboard)

---

*This icon library is designed to scale with Kinship Landing's growth. All icons maintain brand consistency, technical standards, and user-friendly implementation patterns.*
