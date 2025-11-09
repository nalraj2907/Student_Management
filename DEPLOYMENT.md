# Deployment Guide

This guide will help you deploy the Student Management System to various hosting platforms.

## Prerequisites

1. Build the project locally first to ensure everything works:
```bash
npm install
npm run build
```

2. Test the build locally:
```bash
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest platform for deploying React/Vite applications.

#### Steps:

1. **Install Vercel CLI** (optional, you can also use the web interface):
```bash
npm install -g vercel
```

2. **Deploy via CLI**:
```bash
vercel
```
Follow the prompts. Vercel will automatically detect your Vite configuration.

3. **Deploy via Web Interface**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect settings
   - Click "Deploy"

4. **Your site will be live at**: `https://your-project-name.vercel.app`

**Advantages:**
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Automatic deployments on git push
- ✅ Zero configuration needed

---

### Option 2: Netlify

Netlify is another excellent option for React applications.

#### Steps:

1. **Install Netlify CLI** (optional):
```bash
npm install -g netlify-cli
```

2. **Deploy via CLI**:
```bash
# Build the project
npm run build

# Deploy
netlify deploy --prod
```

3. **Deploy via Web Interface**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

4. **Your site will be live at**: `https://your-project-name.netlify.app`

**Advantages:**
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Continuous deployment
- ✅ Form handling (if needed later)

---

### Option 3: GitHub Pages

Free hosting through GitHub Pages.

#### Steps:

1. **Install gh-pages package**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
Add these scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Update vite.config.js**:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with your GitHub repo name
})
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages**:
   - Go to your GitHub repository
   - Settings → Pages
   - Source: `gh-pages` branch
   - Save

6. **Your site will be live at**: `https://your-username.github.io/your-repo-name/`

---

### Option 4: Firebase Hosting

Google's Firebase Hosting service.

#### Steps:

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**:
```bash
firebase login
```

3. **Initialize Firebase**:
```bash
firebase init hosting
```
   - Select your project
   - Public directory: `dist`
   - Single-page app: Yes
   - Overwrite index.html: No

4. **Build and Deploy**:
```bash
npm run build
firebase deploy
```

5. **Your site will be live at**: `https://your-project-id.web.app`

---

### Option 5: Render

Modern hosting platform with free tier.

#### Steps:

1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New +" → "Static Site"
4. Connect your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Create Static Site"

---

## Important Notes

### ⚠️ localStorage Limitation

**Important**: The current app uses `localStorage` for data storage, which means:
- Data is stored in the user's browser
- Data is NOT shared between users
- Data persists only on the same device/browser
- Each user has their own separate data

If you need shared data across users, you'll need to:
- Set up a backend API (Node.js, Python, etc.)
- Use a database (MongoDB, PostgreSQL, etc.)
- Replace localStorage with API calls

### Environment Variables

If you need environment variables:
1. Create a `.env` file (already in .gitignore)
2. For Vercel: Add in Project Settings → Environment Variables
3. For Netlify: Add in Site Settings → Environment Variables

### Custom Domain

All platforms support custom domains:
- **Vercel**: Project Settings → Domains
- **Netlify**: Site Settings → Domain Management
- **Firebase**: Hosting → Add Custom Domain

---

## Quick Deploy Commands

### Vercel (Fastest)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## Troubleshooting

### Build Fails
- Check Node.js version (should be 16+)
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check for any console errors

### 404 Errors on Routes
- Ensure redirect rules are configured (already in config files)
- For GitHub Pages, check the `base` path in `vite.config.js`

### Assets Not Loading
- Check that all paths are relative
- Verify build output in `dist` folder

---

## Recommended Platform

**For beginners**: **Vercel** - Zero configuration, automatic deployments
**For advanced users**: **Netlify** or **Firebase** - More features and control

---

## Need Help?

- Check the platform's documentation
- Review build logs in the platform's dashboard
- Test locally with `npm run preview` first

