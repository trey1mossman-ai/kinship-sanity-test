# Kinship Landing - Deployment SOP

> **Project:** Kinship Landing Website (Sanity + Hostinger)
> **Last Updated:** December 2024

---

## DEPLOYMENT OVERVIEW

This project uses **GitHub-based deployment**. All deployments are triggered by pushing to the main branch.

**DO NOT USE:**
- FTP
- Manual file uploads
- Hostinger File Manager

---

## DEPLOYMENT WORKFLOW

### Step 1: Deploy Sanity Studio (Schema Changes)

If you made changes to Sanity schemas in `/sanity-test-sandbox/`:

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-test-sandbox"
npx sanity deploy
```

This deploys the Sanity Studio to: https://kinship-landing.sanity.studio/

### Step 2: Build and Test Locally

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
npm run build
```

Verify:
- Build completes without errors
- All pages export correctly

### Step 3: Commit and Push to GitHub

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
git add -A
git status  # Review changes
git commit -m "feat: Description of changes"
git push origin main
```

GitHub repository: `https://github.com/trey1mossman-ai/kinship-sanity-test.git`

### Step 4: Verify Deployment

After push, verify the changes are live on the production site.

---

## QUICK DEPLOY COMMAND

For standard deployments (code changes only):

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
npm run build && git add -A && git commit -m "feat: Update description" && git push origin main
```

For schema + code changes:

```bash
# 1. Deploy Sanity schema
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-test-sandbox"
npx sanity deploy

# 2. Deploy website
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
npm run build && git add -A && git commit -m "feat: Update description" && git push origin main
```

---

## SANITY CONTENT UPDATES

Content changes in Sanity Studio (text, images) do NOT require a deployment.

1. Edit content in Sanity Studio: https://kinship-landing.sanity.studio/
2. Click "Publish"
3. Wait 60 seconds (ISR revalidation)
4. Changes appear on live site

---

## FILE LOCATIONS

| Project | Location | Purpose |
|---------|----------|---------|
| Next.js Website | `/sanity-hostinger-test/` | Main website code |
| Sanity Studio | `/sanity-test-sandbox/` | CMS schema and config |
| Production Build | `/KINSHIP_LIVE_PRODUCTION/` | Built static files (for reference) |

---

## TROUBLESHOOTING

### Build Fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Sanity Schema Not Updating
```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-test-sandbox"
npx sanity deploy
```

### Git Push Rejected
```bash
git pull origin main --rebase
git push origin main
```

---

## COMMIT MESSAGE FORMAT

```
type: Description

Types:
- feat: New feature or functionality
- fix: Bug fix
- docs: Documentation changes
- style: Styling changes
- refactor: Code refactoring
- perf: Performance improvements
```

---

## VERIFICATION CHECKLIST

After deployment, verify:

- [ ] Site loads without errors
- [ ] All pages render correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Booking links work
- [ ] Mobile responsive

---

**REMEMBER: Always use GitHub for deployment. Never use FTP or manual uploads.**
