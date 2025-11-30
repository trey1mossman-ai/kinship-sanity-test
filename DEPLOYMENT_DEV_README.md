# 🚀 Kinship Landing - Dev Deployment Guide

## ✅ Crawler Blocking Configuration - ACTIVE

This development environment is **fully protected** from search engine indexing with three layers of crawler blocking:

### 🛡️ Layer 1: robots.txt (Server Level)
**Location:** `/public/robots.txt`

Blocks all crawlers at the file level:
- ✅ All user agents blocked with `Disallow: /`
- ✅ Major search engines explicitly blocked (Google, Bing, Yahoo, DuckDuckGo, etc.)
- ✅ Social media crawlers blocked (Facebook, etc.)

### 🛡️ Layer 2: Meta Tags (HTML Level)
**Location:** `/app/layout.tsx` lines 40-52 and 90-91

Next.js Metadata API configuration:
```typescript
robots: {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  }
}
```

HTML meta tags in `<head>`:
```html
<meta name="robots" content="noindex, nofollow, nocache" />
<meta name="googlebot" content="noindex, nofollow, noimageindex, noarchive" />
```

### 🛡️ Layer 3: HTTP Headers (Apache Level)
**Location:** `deploy-hostinger.sh` line 70

.htaccess configuration:
```apache
Header set X-Robots-Tag "noindex, nofollow, noarchive, nocache"
```

---

## 📦 Build Information

### Build Statistics
- **Build Time:** ~15 seconds (with Turbopack)
- **Total Pages:** 13 static pages
- **Output Size:** 339 MB
- **Main Bundle:** 251 KB (homepage)
- **Shared JS:** 138 KB

### Exported Pages
```
✓ /                      (Homepage - 80.8 KB)
✓ /about                 (14.8 KB)
✓ /about/contact         (3.85 KB)
✓ /about/faq             (10.2 KB)
✓ /about/gallery         (5.82 KB)
✓ /about/our-story       (0 B)
✓ /events                (11.3 KB)
✓ /explore               (0 B)
✓ /homa                  (50.7 KB)
✓ /rooms                 (10.8 KB)
✓ /404                   (Error page)
```

---

## 🔧 Deployment Process

### Prerequisites
- Node.js v20+ installed
- NPM v10+ installed
- Hostinger FTP/File Manager access

### Quick Deploy (Recommended)

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/kinship-hotel"
./deploy-hostinger.sh
```

The script will:
1. ✅ Clean previous builds (.next, out)
2. ✅ Install dependencies (npm ci)
3. ✅ Build production version (npm run build)
4. ✅ Copy files to `../../hostinger-deployment/`
5. ✅ Create .htaccess with crawler blocking + performance headers
6. ✅ Generate deployment-info.txt

### Manual Deploy (Alternative)

```bash
# 1. Build
npm run build

# 2. Upload the /out/ directory contents to Hostinger public_html
# - All files from /out/* go to public_html/
# - Ensure .htaccess is included
# - robots.txt should be in root

# 3. Clear Hostinger cache (via cPanel)
```

---

## 🧪 Verification Checklist

After deploying, verify these items:

### Crawler Blocking Tests
- [ ] Visit `https://yourdomain.com/robots.txt` - Should show "Disallow: /"
- [ ] Check homepage source - Should contain `<meta name="robots" content="noindex, nofollow, nocache">`
- [ ] Check HTTP headers - Should include `X-Robots-Tag: noindex, nofollow`
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results) - Should NOT index

### Rendering Tests
- [ ] Homepage loads without errors
- [ ] All images render correctly
- [ ] Navigation works (header/footer)
- [ ] Mobile responsive (test on actual device)
- [ ] All pages accessible (/about, /rooms, /homa, /events, /explore)
- [ ] Forms work (booking widget, newsletter)
- [ ] Booking links redirect correctly

### Performance Tests
- [ ] Lighthouse score >90 (Performance, Accessibility, Best Practices)
- [ ] LCP <2.5s (Largest Contentful Paint)
- [ ] FID <100ms (First Input Delay)
- [ ] CLS <0.1 (Cumulative Layout Shift)
- [ ] Images lazy-load below fold
- [ ] Fonts load without FOIT (Flash of Invisible Text)

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (desktop + mobile)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

---

## 🚨 IMPORTANT: Production Deployment

### ⚠️ BEFORE LAUNCHING TO PRODUCTION:

**You MUST remove ALL crawler blocking before going live!**

#### 1. Remove robots.txt blocking
**File:** `/public/robots.txt`

Replace entire file with:
```txt
# Kinship Landing - Production
User-agent: *
Allow: /

Sitemap: https://kinshiplanding.com/sitemap.xml
```

#### 2. Remove meta robots tags
**File:** `/app/layout.tsx`

Remove lines 40-52 (robots config in metadata):
```typescript
// DELETE THIS:
robots: {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
  },
},
```

Remove lines 90-91 (HTML meta tags):
```html
<!-- DELETE THESE: -->
<meta name="robots" content="noindex, nofollow, nocache" />
<meta name="googlebot" content="noindex, nofollow, noimageindex, noarchive" />
```

#### 3. Remove X-Robots-Tag header
**File:** `deploy-hostinger.sh`

Remove line 70:
```apache
# DELETE THIS:
Header set X-Robots-Tag "noindex, nofollow, noarchive, nocache"
```

#### 4. Update deployment comment
Change line 55 comment from:
```apache
# Kinship Landing - Hostinger Production Configuration
```

To:
```apache
# Kinship Landing - LIVE PRODUCTION
```

#### 5. Rebuild and redeploy
```bash
npm run build
./deploy-hostinger.sh
```

#### 6. Submit sitemap to Google
- Go to [Google Search Console](https://search.google.com/search-console)
- Submit `https://kinshiplanding.com/sitemap.xml`

---

## 📊 Current Configuration Summary

| Setting | Dev Value | Production Value (TODO) |
|---------|-----------|------------------------|
| robots.txt | `Disallow: /` | `Allow: /` |
| Meta robots | `noindex, nofollow` | REMOVE |
| X-Robots-Tag | `noindex, nofollow` | REMOVE |
| Sitemap | N/A | Submit to Google |

---

## 🛠️ Troubleshooting

### Build fails
```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

### Images not loading
- Check file paths are relative
- Verify images exist in `/public/images/`
- Ensure WebP format supported

### Booking widget not working
- Check Cloudbeds URL is correct
- Verify HTTPS redirect working
- Test in incognito mode (no cache)

### Slow performance
- Check Hostinger cache enabled
- Verify Gzip compression working
- Test image optimization (WebP format)
- Check .htaccess uploaded correctly

---

## 📞 Support

**Build Issues:** Check [Next.js Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

**Hostinger Issues:** Check cPanel or contact Hostinger support

**Crawler Blocking Verification:** Use [Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)

---

## 📝 Deployment Log Template

```txt
Deployment Date: _____________
Deployed By: _____________
Environment: DEV / STAGING / PRODUCTION
Build Version: _____________
Crawler Blocking: YES / NO
Verification Tests: PASS / FAIL
Notes: _____________________________________________
```

---

**Last Updated:** October 17, 2025
**Status:** Dev environment with full crawler blocking ✅
**Next Step:** Upload to Hostinger and verify all 3 blocking layers work
