# Railway Backend Server

This folder contains the backend server files for Railway deployment.

## 📁 Files

- `server.js` - Express backend server
- `package.json` - Server dependencies
- `railway.toml` - Railway configuration

## 🚀 Deploy to Railway

1. Push this `railway` folder to GitHub (or push entire project)
2. In Railway, connect your repository
3. Set **Root Directory** to `railway` (in Railway service settings)
4. Railway will auto-detect and deploy

## 📝 Environment Variables

Set these in Railway dashboard:

- `ENCRYPTION_KEY` - Random 32-byte hex string
- `API_SECRET` - Random 32-byte hex string  
- `NODE_ENV` - Set to `production`

## 📚 Documentation

See the `.md` files in this folder for detailed setup instructions.
