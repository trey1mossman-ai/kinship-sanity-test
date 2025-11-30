# Kinship Landing Website - Project Overview

## 🏨 Project Description
Kinship Landing is a boutique adventure hotel website showcasing downtown Colorado Springs accommodations, HOMA Café + Bar, and local experiences. The site emphasizes authentic local connections and adventure-ready hospitality.

---

## 📁 Project Structure

### 🎨 Brand & Guidelines
- **[BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)** - Complete brand standards and SOPs
- **[BRAND_QUICK_REFERENCE.md](./BRAND_QUICK_REFERENCE.md)** - Developer cheat sheet
- **[lib/config/brand.ts](./lib/config/brand.ts)** - Brand constants and utilities
- **[lib/utils/brand-validator.ts](./lib/utils/brand-validator.ts)** - Development validation tools

### 📋 Project Management
- **[CLIENT_REQUIREMENTS.md](./CLIENT_REQUIREMENTS.md)** - All client requests and feature tracking
- **[DECISIONS.md](./DECISIONS.md)** - Technical decisions and rationale
- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Implementation roadmap

### 🏗️ Technical Documentation
- **[next.config.ts](./next.config.ts)** - Next.js configuration
- **[tailwind.config.ts](./tailwind.config.ts)** - Tailwind CSS setup
- **[package.json](./package.json)** - Dependencies and scripts

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd kinship-hotel

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Workflow
1. **Read brand guidelines** in `BRAND_GUIDELINES.md`
2. **Check client requirements** in `CLIENT_REQUIREMENTS.md`
3. **Import brand constants** from `lib/config/brand.ts`
4. **Validate implementation** with `lib/utils/brand-validator.ts`
5. **Test responsively** on mobile, tablet, desktop

---

## 🎯 Current Priorities (Client Meeting)

### 🔥 High Priority
1. **Hero Section Video Background** - Replace static image with video
2. **Enhanced Booking Widget** - Larger size, better visual prominence
3. **Rotating Reviews Overlay** - Branded review carousel in hero
4. **Homepage Reorganization** - New content block order
5. **HOMA Brand Integration** - Distinct branding within Kinship site

### 📈 Medium Priority
- Animation system implementation
- Two-column layout variety
- Custom image shapes and overlapping
- Visual interest enhancements

*See [CLIENT_REQUIREMENTS.md](./CLIENT_REQUIREMENTS.md) for complete details*

---

## 🎨 Brand System Summary

### Core Identity
- **Personality**: Friendly, Fun, Confident
- **Voice**: Warm, adventure-ready, locally connected
- **Mission**: Making guests feel loved, understood, well cared for

### Color Palette
```css
Primary Green:    #849e74  /* CTAs, links */
Green Dark:       #667C58  /* Hover states */
Green Light:      #697F5B  /* Focus rings */
Text:             #080806  /* Primary text */
White:            #FFFFFF  /* Backgrounds */
```

### Typography
- **Headings**: "utopia-std-display", "Source Serif Pro"
- **Body**: "europa", "Hind"
- **Navigation**: "Montserrat", "europa"

*Full specifications in [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)*

---

## 🏗️ Tech Stack

### Framework & Core
- **Next.js 15.5.2** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first styling with custom design system

### UI & Interactions
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animations and interactions
- **Lucide React** - Icon system

### Performance & SEO
- **Sharp** - Image optimization
- **Next SEO** - Metadata and OpenGraph
- **Static Export** - Deployment optimization

### Development Tools
- **ESLint** - Code quality and standards
- **Turbopack** - Fast bundling and hot reload
- **Brand Validator** - Custom brand compliance checking

---

## 📱 Browser Support

### Target Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Support
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 13+

### Performance Targets
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1
- **Lighthouse Score**: >90 across all categories
- **Bundle Size**: <150KB JS, <50KB CSS

---

## 🔧 Development Guidelines

### Code Standards
- **TypeScript**: All components must be typed
- **Mobile First**: Responsive design starting with mobile
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimize images, lazy load content

### Brand Compliance
- **Colors**: Use only approved palette from `brand.ts`
- **Typography**: Stick to defined font families and scales
- **Voice**: Follow personality and tone guidelines
- **Logo**: Use approved lockup with exact positioning

### Component Architecture
- **Reusability**: Create modular, reusable components
- **Props**: Type all props with TypeScript
- **Styling**: Use Tailwind classes with brand utilities
- **Documentation**: JSDoc comments for complex components

---

## 🚦 Git Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: Individual feature development
- **hotfix/**: Emergency production fixes

### Commit Convention
```
type(scope): description

feat(hero): add video background implementation
fix(header): correct logo positioning on mobile
docs(brand): update voice and tone guidelines
```

### Code Review Process
1. Create feature branch from `develop`
2. Implement feature following brand guidelines
3. Test across devices and browsers
4. Create pull request with description
5. Code review and brand compliance check
6. Merge after approval

---

## 📊 Testing Strategy

### Manual Testing Checklist
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices (iOS Safari, Chrome Mobile)
- [ ] Tablet responsiveness
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Brand compliance validation

### Performance Testing
- [ ] Lighthouse audit (>90 score)
- [ ] Core Web Vitals measurement
- [ ] Bundle size analysis
- [ ] Image optimization verification

### Brand Testing
- [ ] Color contrast ratios
- [ ] Typography rendering
- [ ] Logo positioning and transitions
- [ ] Voice and tone consistency

---

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Static export
npm run export

# Deploy to hosting platform
[deployment-specific commands]
```

### Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=https://kinshiplanding.com
NEXT_PUBLIC_SITE_NAME=Kinship Landing
NEXT_PUBLIC_SITE_DESCRIPTION=Stay, Gather, Explore Colorado Springs
```

### Pre-deployment Checklist
- [ ] All client requirements implemented
- [ ] Brand guidelines followed
- [ ] Performance targets met
- [ ] Cross-browser testing complete
- [ ] Mobile experience optimized
- [ ] SEO metadata updated

---

## 📞 Team Contacts

### Development Team
- **Lead Developer**: [Name]
- **Frontend Developer**: [Name]
- **Designer**: [Name]

### Client Team
- **Project Manager**: [Name]
- **Brand Manager**: [Name]
- **Content Manager**: [Name]

### External Partners
- **Hosting Provider**: [Provider]
- **Domain Registrar**: [Registrar]
- **Analytics**: [Platform]

---

## 📚 Additional Resources

### Design Assets
- **Figma**: [Design file link]
- **Brand Assets**: `/public/brand/`
- **Image Library**: `/public/images/`

### Documentation
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Radix UI**: https://www.radix-ui.com/docs

### Brand References
- **Kinship Website**: https://kinshiplanding.com
- **HOMA Brand**: [HOMA brand guidelines]
- **Colorado Springs**: [Local inspiration sources]

---

## 🎯 Success Metrics

### Business Goals
- Increased direct bookings
- Higher average time on page
- Improved mobile conversion rates
- Enhanced brand recognition

### Technical Goals
- Fast loading times (<3s)
- High accessibility scores
- Clean, maintainable code
- Scalable component architecture

### Brand Goals
- Consistent voice and tone
- Strong visual identity
- Local authenticity
- Adventure-ready positioning

---

**Last Updated**: [Current Date]
**Project Status**: In Active Development
**Next Milestone**: [Upcoming milestone]