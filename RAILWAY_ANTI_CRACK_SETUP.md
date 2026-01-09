# Railway Anti-Crack Setup Guide

This guide explains how to set up your Electron app to pull critical code from Railway, making it impossible to crack without server access.

## 🔒 How It Works

1. **Critical code is stored on Railway** - Not in your Electron app
2. **App fetches code at startup** - After license validation
3. **Code is encrypted** - AES-256-CBC encryption with integrity checks
4. **App won't start without server** - Blocks execution if Railway is unreachable
5. **Code is executed dynamically** - Can't be reverse-engineered from binary

## 📋 Setup Steps

### 1. Deploy Backend to Railway

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and create a new project
3. Connect your repository
4. Railway will auto-detect `server.js` and deploy it
5. Copy your Railway URL (e.g., `https://your-app-name.up.railway.app`)

### 2. Configure Environment Variables in Railway

In Railway dashboard, add these environment variables:

- `ENCRYPTION_KEY` - A random 32-byte hex string (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `API_SECRET` - Another random 32-byte hex string
- `NODE_ENV` - Set to `production`

### 3. Update Electron App Configuration

#### Option A: Environment Variable (Recommended)

Set `RAILWAY_API_URL` when building/running:

```bash
# Windows
set RAILWAY_API_URL=https://your-app-name.up.railway.app
npm start

# Linux/Mac
export RAILWAY_API_URL=https://your-app-name.up.railway.app
npm start
```

#### Option B: Update remote-code-loader.js

Edit `remote-code-loader.js` line 8:

```javascript
this.API_URL = process.env.RAILWAY_API_URL || 
               process.env.API_URL || 
               "https://your-actual-railway-url.up.railway.app";
```

### 4. Test the Setup

1. Start your Railway server: `npm run server` (or deploy to Railway)
2. Run your Electron app: `npm start`
3. Enter a valid license key
4. Check console logs - you should see:
   - ✅ Remote code loader initialized
   - ✅ Core logic module loaded
   - ✅ Macro engine module loaded
   - ✅ Security module loaded
   - ✅ Validation module loaded

## 🔧 Customizing Code Modules

Edit `server.js` to customize the code modules served to clients:

```javascript
function getCodeModule(moduleName) {
  const modules = {
    'core-logic': {
      code: `
        // Your critical code here
        module.exports = {
          initialize: function() {
            // Critical initialization
          },
          getCriticalValue: function() {
            return '${crypto.randomBytes(16).toString('hex')}';
          }
        };
      `
    },
    // Add more modules...
  };
  return modules[moduleName];
}
```

## 🛡️ Security Features

1. **Encryption**: All code is encrypted with AES-256-CBC
2. **Integrity Checks**: SHA-256 hashes verify code hasn't been tampered with
3. **Session Management**: Time-limited sessions prevent replay attacks
4. **HWID Binding**: Code is tied to specific hardware IDs
5. **License Validation**: Only authenticated users can fetch code

## ⚠️ Important Notes

- **Internet Required**: App won't start without Railway connection
- **License Required**: Must authenticate before fetching code
- **Session Expiry**: Sessions expire after 1 hour (configurable)
- **Rate Limiting**: Consider adding rate limiting to prevent abuse

## 🐛 Troubleshooting

### App won't start / "Server connection failed"

1. Check Railway URL is correct
2. Verify Railway deployment is running (check `/health` endpoint)
3. Check internet connection
4. Verify environment variables are set

### "Module not found" error

1. Check server logs in Railway dashboard
2. Verify module names match in `server.js` and `main.js`
3. Check encryption keys are set correctly

### "Authentication failed"

1. Verify license key is valid
2. Check HWID matches session
3. Verify session hasn't expired

## 📝 Next Steps

1. **Add Database**: Store code modules in database instead of hardcoding
2. **Add Versioning**: Serve different code versions to different app versions
3. **Add Monitoring**: Track code fetch requests and failures
4. **Add Rate Limiting**: Prevent abuse with rate limiting middleware
5. **Add Caching**: Cache code modules on client side (with expiry)

## 🔐 Best Practices

1. **Rotate Encryption Keys**: Change keys periodically
2. **Monitor Logs**: Watch for suspicious activity
3. **Update Code Modules**: Regularly update server-side code
4. **Use HTTPS**: Railway provides HTTPS automatically
5. **Validate Everything**: Always validate code integrity before execution

## 📚 API Endpoints

- `POST /api/remote-code/auth` - Authenticate and get session token
- `POST /api/remote-code/fetch` - Fetch encrypted code module
- `GET /health` - Health check

## 🚀 Production Checklist

- [ ] Railway URL configured
- [ ] Encryption keys set in Railway
- [ ] Environment variables configured
- [ ] Code modules customized
- [ ] Testing completed
- [ ] Monitoring set up
- [ ] Error handling tested
- [ ] Documentation updated
