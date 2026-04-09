# Deploy to GitHub Pages - Quick Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name**: `launch-tracker`
3. **Description**: Live Space Dashboard - Real-time rocket launch monitor
4. **Public** (so it's accessible on GitHub Pages)
5. Click "Create repository"

## Step 2: Push Code to GitHub

```bash
cd c:\Users\jumer\Downloads\challenge\launch-tracker

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Launch Tracker Dashboard"

# Add remote
git branch -M main
git remote add origin https://github.com/jumerege/launch-tracker.git

# Push to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/jumerege/launch-tracker
2. Settings → Pages
3. **Source**: Deploy from a branch
4. **Branch**: main (root folder)
5. Click Save

## Step 4: Access Your Live Dashboard

Your dashboard is now live at:

### 🌐 https://jumerege.github.io/launch-tracker/

The URL format is always: `https://{username}.github.io/{repo-name}/`

## ✅ What Your Dashboard Shows

- 🚀 **Next Launch** - Highlighted with mission details
- ⏱️ **Live Countdown** - Days, hours, minutes, seconds to next launch
- 📡 **Upcoming Launches** - List of next 10 missions worldwide
- 🔄 **Auto-refresh** - Updates every minute
- 📊 **Real Data** - From RocketLaunch.Live API

## 🛠️ Features Implemented

✅ Mission name  
✅ Rocket type  
✅ Launch site  
✅ Date/time (UTC)  
✅ Live countdown timer  
✅ Responsive design (mobile-friendly)  
✅ Modern UI with space theme  
✅ Auto-refresh data  
✅ Manual refresh button  

## 📝 Customization

To update your dashboard:

1. Make changes to files:
   - `index.html` - Layout
   - `css/style.css` - Appearance
   - `js/app.js` - Functionality

2. Commit and push:
```bash
git add .
git commit -m "Update: [your changes]"
git push
```

3. Changes appear on GitHub Pages in ~1 minute

## 🔗 Share Your Dashboard

Your live URL: https://jumerege.github.io/launch-tracker/

Share this link! It updates automatically as new launch data becomes available.

## 💡 Pro Tips

- Data refreshes every 60 seconds automatically
- Click "Refresh Data" button for immediate update
- Works on all devices and browsers
- No setup required - just visit the URL!

---

**Happy Launch Tracking! 🚀**
