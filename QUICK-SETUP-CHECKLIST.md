# ⚡ Quick Setup Checklist - Automated Deployment

Follow these steps to enable automatic Hostinger deployment when client publishes in Sanity.

---

## ☑️ Prerequisites (5 min)

- [ ] GitHub account
- [ ] Hostinger FTP credentials
- [ ] Sanity project created (`u2qzrboc`)
- [ ] Test room created in Sanity Studio

---

## ☑️ Step 1: Push to GitHub (2 min)

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"
git init
git add .
git commit -m "Sanity + Hostinger automation"

# Create repo on GitHub (via CLI or web)
gh repo create kinship-sanity-test --public --source=. --remote=origin --push
```

---

## ☑️ Step 2: Add GitHub Secrets (3 min)

1. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** (3 times)
3. Add:

| Name | Value (from Hostinger) |
|------|----------------------|
| `FTP_SERVER` | `ftp.yourdomain.com` |
| `FTP_USERNAME` | Your FTP username |
| `FTP_PASSWORD` | Your FTP password |

**Get FTP credentials:** Hostinger panel → Files → FTP Accounts

---

## ☑️ Step 3: Create GitHub Personal Access Token (2 min)

1. GitHub → Settings → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Name: `Sanity Webhook`
4. Select scope: ✅ `repo` (full control of private repositories)
5. Click **Generate token**
6. **COPY TOKEN NOW** (you won't see it again!)

---

## ☑️ Step 4: Setup Sanity Webhook (5 min)

### Via Sanity Dashboard (Easiest):

1. Go to https://www.sanity.io/manage
2. Select project **Kinship Test Sandbox** (`u2qzrboc`)
3. Click **API** → **Webhooks** → **Create webhook**
4. Fill in:

**Basic Info:**
- Name: `Deploy to Hostinger`
- URL: `https://api.github.com/repos/YOUR_GITHUB_USERNAME/kinship-sanity-test/dispatches`
  - Replace `YOUR_GITHUB_USERNAME` with your actual username!

**Trigger:**
- Dataset: `production`
- Trigger on: ✅ Create, ✅ Update, ✅ Delete
- Filter: `_type == "testRoom"` (optional - only trigger for rooms)

**HTTP Settings:**
- Method: `POST`
- HTTP Headers (click "Add header" twice):
  - Header: `Authorization`
    Value: `Bearer YOUR_GITHUB_TOKEN_HERE`
  - Header: `Accept`
    Value: `application/vnd.github+json`

**Payload:**
```json
{
  "event_type": "sanity-publish"
}
```

5. Click **Save**

---

## ☑️ Step 5: Test It! (10 min)

### Test 1: Manual GitHub Actions Run

1. Go to GitHub repo → **Actions** tab
2. Click **Deploy to Hostinger** workflow (left sidebar)
3. Click **Run workflow** button (right side)
4. Click green **Run workflow**
5. Wait 2-3 minutes
6. Should see green checkmark ✅
7. Check Hostinger - files should be there!

### Test 2: Sanity Publish (The Real Test!)

1. Go to Sanity Studio: http://localhost:3333
2. Edit your test room
3. Change price from `$189999999` to `$299`
4. Click **Publish** (green button)
5. Go to GitHub → **Actions** tab
6. **Should see new workflow run start automatically!** 🎉
7. Wait 3-5 minutes
8. Visit your Hostinger URL
9. Price should be updated to $299!

---

## ☑️ Troubleshooting

### Webhook not triggering?

Check Sanity webhook logs:
1. Sanity dashboard → API → Webhooks
2. Click your webhook
3. View **Delivery history**
4. Look for errors

**Common fixes:**
- GitHub token wrong or expired
- Repository name typo in URL
- Missing `repo` scope on token

### GitHub Actions failing?

1. GitHub → Actions → Click failed run
2. Read error logs

**Common fixes:**
- Missing FTP secrets (check Step 2)
- Wrong FTP credentials
- FTP directory doesn't exist (create `/public_html/sanity-test/` in Hostinger)

---

## ✅ Success! You Now Have:

- ✅ Automatic deployment when client publishes
- ✅ No manual build/upload needed
- ✅ 3-5 minute update time
- ✅ $0/month cost (free tier)
- ✅ Client can update content independently

---

## 🚀 Next: Apply to Full Kinship Site

Once this works:
1. Copy `.github/workflows/deploy-hostinger.yml` to main Kinship repo
2. Update secrets with production FTP credentials
3. Change FTP path to `/public_html/` (root domain)
4. Update webhook filter to trigger on all content types
5. Same automation - just more schemas!

**Time savings:**
Before: 30-60 min per update (developer manual work)
After: 3-5 min (fully automatic)
