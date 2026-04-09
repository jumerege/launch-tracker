# 🚀 Launch Tracker - Live Space Dashboard

A real-time rocket launch monitoring dashboard built with HTML, CSS, and JavaScript. Track upcoming space missions from around the world with live countdown timers.

## Features

✅ **Real-time Launch Data** - Fetches live data from RocketLaunch.Live API  
✅ **Live Countdown Timer** - Automatic countdown to next launch  
✅ **Mission Details** - Shows rocket type, launch site, provider, and mission name  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices  
✅ **Auto-refresh** - Data refreshes every minute automatically  
✅ **Modern UI** - Space-themed interface with glassmorphism effects  

## What's Included

- **Mission name** - Name of the space mission
- **Rocket type** - The launch vehicle being used
- **Launch site** - Location of the launch
- **Date/Time** - Exact launch date and time (UTC)
- **Live countdown** - Real-time countdown to next launch
- **Upcoming launches list** - Next 10 scheduled launches

## Quick Start

### Local Testing

1. Clone this repository:
```bash
git clone https://github.com/jumerege/launch-tracker.git
cd launch-tracker
```

2. Open in a web browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

### Deploy to GitHub Pages

1. Create a new repository named `launch-tracker` on GitHub
2. Push this code to the repository:
```bash
git init
git add .
git commit -m "Initial commit - Launch Tracker dashboard"
git branch -M main
git remote add origin https://github.com/jumerege/launch-tracker.git
git push -u origin main
```

3. Go to your repository settings → Pages → Set source to `main` branch
4. Your dashboard will be live at: **https://jumerege.github.io/launch-tracker/**

## Project Structure

```
launch-tracker/
├── index.html          # Main dashboard page
├── css/
│   └── style.css      # Styling with space theme
├── js/
│   └── app.js         # Fetch and countdown logic
├── README.md          # Documentation
└── .gitignore         # Git ignore rules
```

## API Source

- **RocketLaunch.Live API** - Free API providing real rocket launch data
- No API key required for basic usage
- Endpoint: `https://api.rocketlaunch.live/v0/launches`

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with grid/flexbox
- **Vanilla JavaScript (ES2020+)** - No frameworks needed
- **GitHub Pages** - Free static hosting

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## Features Implemented

✅ Real-time launch data fetching  
✅ Live countdown with day/hour/minute/second breakdown  
✅ Next launch highlight with prominent display  
✅ Upcoming lanches grid (next 10 missions)  
✅ Auto-refresh every 60 seconds  
✅ Manual refresh button  
✅ Last updated timestamp  
✅ Error handling and fallbacks  
✅ Fully responsive design  
✅ Space-themed modern UI with glassmorphism  

## Customization

To customize the dashboard, edit these files:

- **Colors**: Change CSS variables in `css/style.css` (`:root` section)
- **Refresh rate**: Change `REFRESH_INTERVAL` in `js/app.js`
- **Number of launches**: Change `limit=20` in the API call
- **Countdown update speed**: Change `COUNTDOWN_INTERVAL` in `js/app.js`

## License

MIT License - Feel free to use for any purpose

## Support

For issues or feature requests, create an issue on GitHub.

---

**GitHub Pages Live URL:** https://jumerege.github.io/launch-tracker/
