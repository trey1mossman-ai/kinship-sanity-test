# 🎯 Kinship Landing - Developer Quick Reference

## 🚀 Quick Start Checklist
- [ ] Read `/BRAND_GUIDELINES.md` completely
- [ ] Import brand config: `import { KINSHIP_COLORS } from '@/lib/config/brand'`
- [ ] Verify fonts are loaded
- [ ] Test on mobile first

## 🎨 Essential Colors
```css
Primary Green:    #849e74  /* CTAs, links */
Green Dark:       #667C58  /* Hover states */
Green Light:      #697F5B  /* Focus rings */
Text:             #080806  /* Primary text */
White:            #FFFFFF  /* Backgrounds */
```

## 📱 Responsive Logo Implementation
```tsx
// COPY-PASTE APPROVED HEADER LOGO
<Link href="/" className="flex items-center gap-0 sm:gap-0.5">
  <Image src="/brand/Kinship Header Logo.webp" alt="Kinship Landing"
    width={140} height={35}
    className="h-8 sm:h-9 lg:h-10 w-auto transition-all duration-300"
    style={{ filter: isScrolled ? 'brightness(0) saturate(100%) invert(45%) sepia(30%) saturate(364%) hue-rotate(75deg) brightness(94%) contrast(89%)' : 'brightness(0) invert(1)' }} />

  <div className="h-4 sm:h-5 lg:h-6 w-px -ml-9 mr-8 transition-colors duration-300 bg-white/40" />

  <Image src="/brand/Homa Logo.webp" alt="Homa Café + Bar"
    width={28} height={14}
    className="h-2.5 sm:h-3.5 lg:h-4.5 w-auto -ml-2 sm:-ml-3 transition-all duration-300"
    style={{ filter: isScrolled ? 'brightness(0) saturate(100%) invert(45%) sepia(30%) saturate(364%) hue-rotate(75deg) brightness(94%) contrast(89%)' : 'brightness(0) invert(1)' }} />
</Link>
```

## 🔘 Button Standards
```tsx
// Primary CTA
<button className="bg-[#849e74] hover:bg-[#667C58] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
  Book Now
</button>

// Secondary Button
<button className="border border-[#E5E7E4] hover:bg-[#697F5B] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all">
  Learn More
</button>
```

## 📏 Spacing Scale
```css
Mobile:   py-10  (40px)
Tablet:   py-14  (56px)
Desktop:  py-20  (80px)

Container: max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8
```

## 🎭 Animation Standards
```css
Duration:     300ms (default)
Easing:       ease-out
Hover Scale:  scale(1.05)
Transitions:  transition-all duration-300
```

## ❌ Common Mistakes to Avoid
- ❌ Using `#000000` instead of `#080806`
- ❌ Breaking the dual-logo lockup
- ❌ Using non-brand fonts
- ❌ Fixed pixel widths on responsive elements
- ❌ Skipping mobile-first design

## 🗣️ Voice & Tone Essentials

### Kinship Personality
**Friendly • Fun • Confident**

### Brand Voice (Never Changes)
- Warm & authentic
- Adventure-ready
- Community-focused
- Locally connected

### Tone Spectrum (Context Dependent)
```
🎉 Fun & Lighthearted     💼 Professional        🤝 Empathetic
Social media, greetings   Bookings, policies     Issues, concerns
```

### Approved Brand Phrases
- "Experience like a local"
- "Sleep well. Meet locals. Launch adventures."
- "Outrageous hospitality, crafted by locals"
- "Your Colorado Springs basecamp"

### Phrases to Avoid
- "Luxury accommodations"
- "World-class service"
- "Premier destination"
- Generic hotel speak

## 🆘 Need Help?
1. Check `/BRAND_GUIDELINES.md` for full documentation
2. Use `/lib/config/brand.ts` for all constants
3. Test accessibility with brand focus colors
4. Validate on mobile, tablet, and desktop

## 📞 Approval Required For:
- New colors outside approved palette
- Logo modifications
- Font family changes
- Major layout structure changes
- Voice & tone deviations