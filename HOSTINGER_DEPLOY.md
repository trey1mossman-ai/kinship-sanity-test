# Hostinger Deployment - Sanity Test

This folder contains a **production-ready** static site that fetches data from Sanity at build time.

## ✅ Ready to Deploy

The `out/` folder contains static HTML files ready for Hostinger FTP upload.

---

## Deployment Steps

### 1. Build the Site (Fetches Sanity Data)

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
npm run build
```

**What this does:**
- Fetches ALL rooms from Sanity (`projectId: u2qzrboc`)
- Generates static HTML in `out/` folder
- Optimizes CSS, JS, images

### 2. Upload to Hostinger via FTP

**Option A: Manual FTP Upload**
1. Connect to Hostinger FTP
2. Navigate to `public_html/` (or subdomain folder)
3. Upload contents of `out/` folder
4. Done!

**Option B: Automated Script** (if you have FTP credentials)
```bash
# You can create an FTP upload script later
```

### 3. Test Live Site

Visit your Hostinger URL - you'll see your Sanity rooms displayed!

---

## How the Workflow Works

### Development Mode (Local Testing):
```bash
npm run dev  # Fetches Sanity data on every page load
```
Open http://localhost:3000 - instant updates when you edit Sanity

### Production Mode (Hostinger):
```bash
npm run build  # Fetches Sanity data ONCE at build time
# Upload out/ to Hostinger
```
Site is now STATIC - no database, instant load, SEO-friendly

---

## Updating Content

**Client edits content in Sanity Studio:**
1. Go to http://localhost:3333 (or studio.sanity.io)
2. Edit a room (change price, description, etc.)
3. Click "Publish"

**Developer rebuilds and deploys:**
1. Run `npm run build` (fetches new Sanity data)
2. Upload `out/` folder to Hostinger
3. Live site updated in 2-3 minutes

---

## Key Differences from Dev Site

| Feature | Dev Site (localhost:3001) | Production (Hostinger) |
|---------|--------------------------|----------------------|
| **Data fetch** | Every page load | Build time only |
| **Speed** | Slow (API calls) | Instant (static HTML) |
| **Updates** | Auto (refresh page) | Manual rebuild needed |
| **SEO** | No | Perfect (static HTML) |
| **Cost** | Free (localhost) | Hostinger hosting only |

---

## File Structure

```
sanity-hostinger-test/
├── out/                  ← Upload this to Hostinger
│   ├── index.html       ← Homepage with Sanity data baked in
│   ├── _next/           ← CSS, JS, optimized assets
│   └── 404.html         ← Error page
├── app/
│   ├── page.tsx         ← Fetches Sanity data at build time
│   └── layout.tsx
├── lib/
│   └── sanity.ts        ← Sanity client config
└── next.config.ts       ← `output: 'export'` for static export
```

---

## What's Baked into the Static HTML

When you run `npm run build`, the `out/index.html` file contains:
- ✅ Room names, prices, descriptions
- ✅ Features list
- ✅ Image URLs (from Sanity CDN)
- ✅ All styling (inline CSS)
- ✅ Zero JavaScript needed for content display

---

## Testing the Build Locally

After building, test the static export:

```bash
npx serve out/
```

Opens at http://localhost:3000 - this is EXACTLY what Hostinger will serve.

---

## Next Steps for Full Kinship Site

This is the exact workflow you'll use:

1. **Migrate all 10 rooms** to Sanity
2. **Create schemas** for FAQs, site copy, reviews
3. **Update pages** to fetch from Sanity
4. **Build** → static export to `out/`
5. **Upload** to Hostinger (same FTP process)
6. **Automate** with GitHub Actions (optional)

---

## Troubleshooting

**"No rooms found" after deployment:**
- Make sure you ran `npm run build` AFTER creating rooms in Sanity
- Check that project ID is correct (`u2qzrboc`)
- Verify Sanity dataset is `production`

**Images not loading:**
- Check Sanity image URLs in browser console
- Verify `cdn.sanity.io` is accessible

**Build fails:**
- Run `npm install` to reinstall dependencies
- Check TypeScript errors: `npx tsc --noEmit`

---

## Cost Breakdown

**This test deployment:**
- Sanity: $0 (free tier)
- Hostinger: Already paid
- Total: $0/month

**Full Kinship site:**
- Same cost structure
- No increase for CMS integration
