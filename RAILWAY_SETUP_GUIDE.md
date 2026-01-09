# 🚂 Railway Setup Guide - Step by Step

Complete guide to deploy your backend server to Railway.

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be on GitHub
2. **Railway Account** - Sign up at [railway.app](https://railway.app) (free tier available)
3. **Node.js installed** - For testing locally (optional)

---

## 🚀 Step 1: Prepare Your Code

### 1.1 Make sure these files exist:
- ✅ `server.js` - Your backend server
- ✅ `railway.toml` - Railway configuration
- ✅ `package.json` - With Express dependencies

### 1.2 Test locally (optional but recommended):
```bash
# Install dependencies
npm install

# Test server locally
npm run server
```

You should see: `🚀 Server running on port 3000`

Visit `http://localhost:3000/health` - should return `{"status":"healthy"}`

---

## 📤 Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done):
```bash
git init
git add .
git commit -m "Add Railway backend server"
```

### 2.2 Create GitHub repository:
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it (e.g., `my-electron-app-backend`)
4. Click "Create repository"

### 2.3 Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🚂 Step 3: Deploy to Railway

### 3.1 Sign up / Login:
1. Go to [railway.app](https://railway.app)
2. Click "Login" or "Start a New Project"
3. Sign in with GitHub (recommended)

### 3.2 Create New Project:
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select your repository
4. Click **"Deploy Now"**

### 3.3 Railway Auto-Detection:
Railway will automatically:
- ✅ Detect `server.js` as the entry point
- ✅ Use `railway.toml` for configuration
- ✅ Install dependencies from `package.json`
- ✅ Start the server

**Wait 2-3 minutes for deployment to complete**

---

## 🔐 Step 4: Configure Environment Variables

### 4.1 Generate Encryption Keys:

**Open terminal/command prompt and run:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Run it TWICE** to get two different keys:
- Copy the first output → This is your `ENCRYPTION_KEY`
- Copy the second output → This is your `API_SECRET`

### 4.2 Add Environment Variables in Railway:

1. In Railway dashboard, click on your **service**
2. Go to **"Variables"** tab
3. Click **"New Variable"**
4. Add these variables one by one:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `ENCRYPTION_KEY` | `[paste first key]` | For encrypting code modules |
| `API_SECRET` | `[paste second key]` | Additional security secret |
| `NODE_ENV` | `production` | Environment mode |

5. Click **"Add"** for each variable
6. Railway will **automatically redeploy** with new variables

---

## 🌐 Step 5: Get Your Railway URL

### 5.1 Find Your URL:

1. In Railway dashboard, click your **service**
2. Go to **"Settings"** tab
3. Scroll to **"Domains"** section
4. You'll see your Railway URL:
   ```
   https://your-app-name.up.railway.app
   ```
5. **Copy this URL** - You'll need it!

### 5.2 Test Your Deployment:

Open your browser and visit:
```
https://your-app-name.up.railway.app/health
```

Should return: `{"status":"healthy"}`

---

## ⚙️ Step 6: Configure Your Electron App

### Option A: Update remote-code-loader.js (Recommended)

1. Open `remote-code-loader.js`
2. Find line 13-15:
```javascript
this.API_URL = process.env.RAILWAY_API_URL || 
               process.env.API_URL || 
               "https://your-app-name.up.railway.app";
```

3. Replace `"https://your-app-name.up.railway.app"` with your actual Railway URL:
```javascript
this.API_URL = process.env.RAILWAY_API_URL || 
               process.env.API_URL || 
               "https://your-actual-railway-url.up.railway.app";
```

### Option B: Use Environment Variable

When running your app:
```bash
# Windows
set RAILWAY_API_URL=https://your-actual-railway-url.up.railway.app
npm start

# Linux/Mac
export RAILWAY_API_URL=https://your-actual-railway-url.up.railway.app
npm start
```

---

## ✅ Step 7: Test Everything

### 7.1 Test Server:
1. Visit: `https://your-railway-url.up.railway.app/`
2. Should see: `{"status":"online","message":"Electron App Backend API",...}`

### 7.2 Test Electron App:
1. Run your Electron app: `npm start`
2. Enter a valid license key
3. Check console logs - you should see:
   ```
   ✅ Remote code loader initialized
   ✅ Core logic module loaded
   ✅ Macro engine module loaded
   ✅ Security module loaded
   ✅ Validation module loaded
   ```

### 7.3 If It Works:
🎉 **Congratulations! Your Railway setup is complete!**

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to server"

**Solutions:**
1. ✅ Check Railway URL is correct in `remote-code-loader.js`
2. ✅ Verify Railway deployment is running (check dashboard)
3. ✅ Visit Railway URL in browser - should show JSON response
4. ✅ Check Railway logs for errors

### Problem: "Authentication failed"

**Solutions:**
1. ✅ Verify environment variables are set in Railway
2. ✅ Check `ENCRYPTION_KEY` and `API_SECRET` are set
3. ✅ Make sure Railway redeployed after adding variables

### Problem: "Module not found"

**Solutions:**
1. ✅ Check Railway logs in dashboard
2. ✅ Verify `server.js` has the `getCodeModule()` function
3. ✅ Check module names match in `server.js` and `main.js`

### Problem: Railway deployment fails

**Solutions:**
1. ✅ Check `package.json` has all dependencies
2. ✅ Verify `server.js` exists in root directory
3. ✅ Check Railway logs for specific error messages
4. ✅ Make sure `railway.toml` is correct

---

## 📊 Monitoring Your Deployment

### View Logs:
1. In Railway dashboard → Click your service
2. Go to **"Deployments"** tab
3. Click on latest deployment
4. View **"Logs"** to see server output

### Check Status:
- Green dot = Running ✅
- Yellow dot = Building ⏳
- Red dot = Error ❌

---

## 🔄 Updating Your Deployment

When you make changes:

1. **Update code locally**
2. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Update server code"
   git push
   ```
3. **Railway automatically redeploys** (watch dashboard)

---

## 💰 Railway Pricing

- **Free Tier**: $5 credit/month (usually enough for small apps)
- **Hobby Plan**: $5/month (if you exceed free tier)
- **Pro Plan**: $20/month (for production apps)

**Your setup should work on the free tier!**

---

## 🎯 Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Repository connected
- [ ] Deployment successful (green status)
- [ ] Environment variables set (`ENCRYPTION_KEY`, `API_SECRET`, `NODE_ENV`)
- [ ] Railway URL copied
- [ ] `remote-code-loader.js` updated with Railway URL
- [ ] Tested `/health` endpoint
- [ ] Tested Electron app connection
- [ ] All modules loading successfully

---

## 📞 Need Help?

1. **Railway Docs**: [docs.railway.app](https://docs.railway.app)
2. **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
3. **Check Logs**: Railway dashboard → Your service → Logs

---

**You're all set! Your Electron app now pulls critical code from Railway! 🎉**
