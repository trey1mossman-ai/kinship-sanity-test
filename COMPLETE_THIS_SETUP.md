# 🚀 COMPLETE AUTOMATION SETUP - ACTION REQUIRED

**Status:** Git repository initialized and committed. Ready to push to GitHub.

**Your GitHub username:** `trey1mossman-ai`

---

## ⚡ Quick 15-Minute Setup

Follow these steps exactly to enable automatic Hostinger deployment:

---

### Step 1: Create GitHub Repository (2 minutes)

**Option A - Via GitHub Website (Easiest):**
1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `kinship-sanity-test`
   - **Description:** `Sanity CMS + Hostinger automated deployment test`
   - **Visibility:** Public or Private (your choice)
   - **⚠️ DO NOT** initialize with README, .gitignore, or license
3. Click **Create repository**
4. **STOP - Don't follow GitHub's setup instructions yet**

**Option B - Via Command Line:**
```bash
# If you have GitHub CLI installed
gh repo create kinship-sanity-test --public --description "Sanity CMS + Hostinger automated deployment test"
```

---

### Step 2: Push Code to GitHub (1 minute)

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"

# Add remote (replace USERNAME if needed)
git remote add origin https://github.com/trey1mossman-ai/kinship-sanity-test.git

# Push code
git push -u origin main
```

**If it asks for authentication:**
- Username: `trey1mossman-ai`
- Password: Use a **Personal Access Token** (not your GitHub password)
  - Create token at: https://github.com/settings/tokens
  - Select scope: `repo` (full control)
  - Copy token and paste as password

---

### Step 3: Create GitHub Personal Access Token for Webhook (2 minutes)

1. Go to https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Fill in:
   - **Note:** `Sanity Webhook Trigger`
   - **Expiration:** 90 days (or No expiration)
   - **Select scopes:** ✅ `repo` (full control of private repositories)
4. Click **Generate token**
5. **⚠️ COPY TOKEN NOW** - You won't see it again!
6. Save it somewhere safe (you'll need it in Step 5)

---

### Step 4: Add Hostinger FTP Secrets to GitHub (3 minutes)

1. Go to your GitHub repo: `https://github.com/trey1mossman-ai/kinship-sanity-test`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** (3 times)
4. Add these 3 secrets:

**Secret 1:**
- Name: `FTP_SERVER`
- Value: Your Hostinger FTP hostname (e.g., `ftp.yourdomain.com` or `123.45.67.89`)

**Secret 2:**
- Name: `FTP_USERNAME`
- Value: Your Hostinger FTP username (e.g., `u123456789`)

**Secret 3:**
- Name: `FTP_PASSWORD`
- Value: Your Hostinger FTP password

**To get FTP credentials:**
- Login to Hostinger panel
- Go to **Files** → **FTP Accounts**
- Use existing account or create new one
- Copy: Host, Username, Password

---

### Step 5: Setup Sanity Webhook (5 minutes)

**Via Sanity Dashboard:**

1. Go to https://www.sanity.io/manage
2. Select project **Kinship Test Sandbox** (`u2qzrboc`)
3. Click **API** → **Webhooks** → **Create webhook**
4. Fill in:

**Name:** `Deploy to Hostinger`

**URL:**
```
https://api.github.com/repos/trey1mossman-ai/kinship-sanity-test/dispatches
```

**Dataset:** `production`

**Trigger on:**
- ✅ Create
- ✅ Update
- ✅ Delete

**Filter (optional):**
```
_type == "testRoom"
```
(This triggers only when rooms change. Leave blank to trigger on any content change.)

**HTTP method:** `POST`

**HTTP headers (click "Add header" twice):**

Header 1:
- **Name:** `Authorization`
- **Value:** `Bearer YOUR_GITHUB_TOKEN_HERE`
  - Replace `YOUR_GITHUB_TOKEN_HERE` with token from Step 3

Header 2:
- **Name:** `Accept`
- **Value:** `application/vnd.github+json`

**Payload:**
```json
{
  "event_type": "sanity-publish"
}
```

5. Click **Save**

---

### Step 6: Test the Automation! (10 minutes)

**Test 1: Manual GitHub Actions Run**

1. Go to https://github.com/trey1mossman-ai/kinship-sanity-test/actions
2. Click **Deploy to Hostinger** workflow (left sidebar)
3. Click **Run workflow** button (top right)
4. Click green **Run workflow**
5. Wait 2-3 minutes
6. Should see green checkmark ✅
7. Check Hostinger FTP - files should be in `/public_html/sanity-test/`

**Test 2: Sanity Publish (The Real Test!)**

1. Go to Sanity Studio: http://localhost:3333 (make sure it's running)
2. Edit your test room
3. Change the price to `$299`
4. Click **Publish** (green button)
5. Go to https://github.com/trey1mossman-ai/kinship-sanity-test/actions
6. **Should see new workflow run start automatically!** 🎉
7. Wait 3-5 minutes
8. Visit your Hostinger URL
9. Price should be updated to $299!

---

## 🔧 Troubleshooting

### Webhook not triggering?

**Check Sanity webhook logs:**
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
- Missing FTP secrets (check Step 4)
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

## 📋 Summary of What Was Automated

**Before:**
1. Client emails developer: "Please update room price"
2. Developer logs into codebase
3. Developer edits hardcoded price
4. Developer builds site
5. Developer uploads to Hostinger via FTP
6. **Total time: 30-60 minutes, Cost: $50-100**

**After (with automation):**
1. Client logs into Sanity Studio
2. Client edits room price
3. Client clicks "Publish"
4. **Site updates automatically in 3-5 minutes, Cost: $0**

---

## 🔐 Security Checklist

✅ FTP credentials stored in GitHub Secrets (encrypted)
✅ GitHub PAT has minimal scope (`repo` only)
✅ Sanity project ID is public (safe to commit)
✅ No passwords in code

---

## 📞 Need Help?

Check these files in this folder:
- `AUTOMATION_SETUP.md` - Detailed technical guide
- `QUICK-SETUP-CHECKLIST.md` - Step-by-step checklist
- `HOSTINGER_DEPLOY.md` - Deployment details

---

## 🚀 Next: Apply to Full Kinship Site

Once this test works:
1. Copy `.github/workflows/deploy-hostinger.yml` to main Kinship repo
2. Update FTP path to `/public_html/` (root domain)
3. Change webhook filter to trigger on all content types
4. Same automation - just more schemas!
