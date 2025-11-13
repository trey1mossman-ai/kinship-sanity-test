# Automatic Deployment Setup

This guide sets up **automatic deployments** so when the client publishes content in Sanity, it automatically deploys to Hostinger.

## 🎯 Goal: Client Publishes → Auto-Deploy to Hostinger

**Workflow:**
1. Client edits room in Sanity Studio
2. Client clicks "Publish"
3. **Sanity webhook** triggers GitHub Actions
4. **GitHub Actions** builds site (fetches Sanity data)
5. **GitHub Actions** uploads to Hostinger via FTP
6. **Live in 3-5 minutes** - no developer needed!

---

## Step 1: Push Code to GitHub

```bash
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-hostinger-test"

# Initialize git repo
git init
git add .
git commit -m "Initial commit: Sanity + Hostinger test"

# Create GitHub repo and push
# (Use GitHub CLI or web interface to create repo)
gh repo create kinship-sanity-test --public --source=. --remote=origin --push
```

---

## Step 2: Add GitHub Secrets (FTP Credentials)

Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 3 secrets:

| Secret Name | Value | Example |
|------------|-------|---------|
| `FTP_SERVER` | Your Hostinger FTP host | `ftp.yourdomain.com` or `123.45.67.89` |
| `FTP_USERNAME` | Your Hostinger FTP username | `u123456789` |
| `FTP_PASSWORD` | Your Hostinger FTP password | `your-ftp-password` |

**To get FTP credentials:**
1. Login to Hostinger panel
2. Go to **Files** → **FTP Accounts**
3. Use existing account or create new one
4. Copy Host, Username, Password

---

## Step 3: Setup Sanity Webhook

### Option A: Via Sanity CLI (Recommended)

```bash
# Install Sanity CLI globally (if not already)
npm install -g @sanity/cli

# Login to Sanity
sanity login

# Navigate to Sanity project
cd "/Volumes/Trey's Macbook TB/Kinship Landing/boutique-hotel/sanity-test-sandbox"

# Create webhook
sanity hook create
```

**When prompted:**
- **Name:** `Deploy to Hostinger`
- **URL:** `https://api.github.com/repos/YOUR_USERNAME/kinship-sanity-test/dispatches`
- **Dataset:** `production`
- **Trigger on:** `create`, `update`, `delete`
- **Filter:** `_type == "testRoom"` (only trigger for room changes)
- **HTTP method:** `POST`
- **HTTP headers:**
  ```
  Authorization: Bearer YOUR_GITHUB_PAT
  Accept: application/vnd.github+json
  ```
- **Payload:**
  ```json
  {
    "event_type": "sanity-publish"
  }
  ```

### Option B: Via Sanity Dashboard (Easier)

1. Go to https://www.sanity.io/manage
2. Select your project (`kinship-test-sandbox`)
3. Click **API** → **Webhooks**
4. Click **Create webhook**
5. Fill in:
   - **Name:** `Deploy to Hostinger`
   - **URL:** `https://api.github.com/repos/YOUR_USERNAME/kinship-sanity-test/dispatches`
   - **Dataset:** `production`
   - **Trigger on:** `Create`, `Update`, `Delete`
   - **Filter:** `_type == "testRoom"`
   - **HTTP method:** `POST`
   - **Secret:** (leave blank)
   - **Custom headers:**
     - `Authorization`: `Bearer YOUR_GITHUB_PAT`
     - `Accept`: `application/vnd.github+json`
   - **Custom payload:**
     ```json
     {
       "event_type": "sanity-publish"
     }
     ```
6. Click **Save**

### Getting GitHub Personal Access Token (PAT)

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Name: `Sanity Webhook`
4. Scopes: Check `repo` (full control)
5. Click **Generate token**
6. **Copy token** (you won't see it again!)
7. Use this token in webhook `Authorization: Bearer YOUR_TOKEN`

---

## Step 4: Test the Automation

### Manual Test (Verify GitHub Actions Works):
1. Go to your GitHub repo
2. Click **Actions** tab
3. Click **Deploy to Hostinger** workflow
4. Click **Run workflow** button
5. Watch it run (should complete in 2-3 min)
6. Check Hostinger - files should be uploaded!

### Automatic Test (Verify Sanity Webhook Works):
1. Go to Sanity Studio (http://localhost:3333)
2. Edit a test room
3. Change the price
4. Click **Publish**
5. Go to GitHub → **Actions** tab
6. You should see new workflow run triggered!
7. Wait 3-5 minutes
8. Check your Hostinger site - content updated!

---

## Step 5: Verify Deployment

After GitHub Actions completes:

1. **Check GitHub Actions logs:**
   - Green checkmark = success
   - Red X = failed (check logs for errors)

2. **Check Hostinger:**
   - FTP to your site
   - Verify files in `/public_html/sanity-test/`
   - Check timestamps (should be recent)

3. **Check live site:**
   - Visit your Hostinger URL
   - See if content matches Sanity
   - View source - should see room data in HTML

---

## Troubleshooting

### Webhook not triggering:

**Check Sanity webhook logs:**
1. Go to Sanity dashboard → **API** → **Webhooks**
2. Click your webhook
3. View **Delivery history**
4. Look for errors

**Common issues:**
- Wrong GitHub token (needs `repo` scope)
- Wrong repository name in URL
- Filter too restrictive (`_type == "testRoom"` only triggers for rooms)

### GitHub Actions failing:

**Check workflow logs:**
1. GitHub repo → **Actions** tab
2. Click failed run
3. Expand failed step
4. Read error message

**Common issues:**
- Missing secrets (FTP_SERVER, FTP_USERNAME, FTP_PASSWORD)
- Wrong FTP credentials
- Wrong FTP path (`server-dir: /public_html/sanity-test/`)
- npm ci fails (delete `package-lock.json`, run `npm install`, commit new lock file)

### FTP upload fails:

**Common issues:**
- Wrong server address (check Hostinger panel)
- Firewall blocking GitHub Actions IP
- Directory doesn't exist on Hostinger (create `/public_html/sanity-test/` first)
- Permissions issue (check folder permissions in Hostinger file manager)

**Test FTP manually:**
```bash
# Install lftp
brew install lftp  # macOS

# Test connection
lftp -u YOUR_USERNAME,YOUR_PASSWORD ftp://YOUR_SERVER

# If connected successfully:
cd /public_html/sanity-test
ls
exit
```

---

## Security Best Practices

✅ **Use GitHub Secrets** for FTP credentials (never commit passwords)
✅ **Create dedicated FTP user** with limited access (only `/public_html/sanity-test/`)
✅ **Rotate credentials** periodically
✅ **Use HTTPS** for Sanity webhook URL
✅ **GitHub PAT** should have minimal scope (`repo` only)

---

## Cost Breakdown

**This automation:**
- Sanity webhooks: **Free** (unlimited)
- GitHub Actions: **2,000 min/month free** (each deploy ~2-3 min)
- Hostinger FTP: **Included** in hosting

**Total: $0/month** for up to ~600-1,000 deploys/month

---

## Full Workflow Diagram

```
┌─────────────────┐
│ Client          │
│ (Sanity Studio) │
└────────┬────────┘
         │ 1. Edits room
         │ 2. Clicks "Publish"
         ▼
┌─────────────────┐
│ Sanity Cloud    │
│ (Database)      │
└────────┬────────┘
         │ 3. Webhook POST
         ▼
┌─────────────────┐
│ GitHub Actions  │
│ (Build Server)  │
└────────┬────────┘
         │ 4. npm run build
         │    (fetches Sanity data)
         │ 5. FTP upload out/
         ▼
┌─────────────────┐
│ Hostinger       │
│ (Web Server)    │
└────────┬────────┘
         │ 6. Live site updated!
         ▼
┌─────────────────┐
│ Website Visitor │
│ (Sees new data) │
└─────────────────┘
```

**Time:** 3-5 minutes from publish to live
**Human interaction:** ZERO (fully automated)

---

## Next: Apply to Full Kinship Site

Once tested here, you'll:
1. Copy `.github/workflows/deploy-hostinger.yml` to main Kinship repo
2. Update FTP path to `/public_html/` (root)
3. Add webhook for all content types (rooms, FAQs, copy, reviews)
4. Same automation - just more schemas!
