// Launch Tracker - Real-time Space Dashboard
// Displays upcoming rocket launches with live countdown

const API_URL = 'https://api.rocketlaunch.live/v0/launches';

let allLaunches = [];
let nextLaunch = null;

// Sample data for fallback
const sampleLaunches = [
    {
        name: "Starlink Group 7-12",
        date: new Date(Date.now() + 7*24*60*60*1000),
        rocket: "SpaceX Falcon 9",
        provider: "SpaceX",
        location: "Kennedy Space Center, Florida",
        status: "Go"
    },
    {
        name: "Kuiper Constellation",
        date: new Date(Date.now() + 14*24*60*60*1000),
        rocket: "Blue Origin New Glenn",
        provider: "Blue Origin",
        location: "Cape Canaveral, Florida",
        status: "Go"
    },
    {
        name: "James Webb Deep Field Survey",
        date: new Date(Date.now() + 21*24*60*60*1000),
        rocket: "ESA Ariane 6",
        provider: "ESA",
        location: "Kourou, French Guiana",
        status: "Go"
    },
    {
        name: "Lunar Sample Return",
        date: new Date(Date.now() + 30*24*60*60*1000),
        rocket: "China Long March 5",
        provider: "CNSA",
        location: "Wenchang, China",
        status: "TBD"
    },
    {
        name: "Lunar Gateway Module",
        date: new Date(Date.now() + 45*24*60*60*1000),
        rocket: "SpaceX Starship",
        provider: "SpaceX",
        location: "Starbase, Texas",
        status: "TBD"
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Launch Tracker started');
    
    // Load data
    loadLaunches();
    
    // Setup refresh
    setInterval(loadLaunches, 60000); // Refresh every minute
    setInterval(updateCountdown, 1000); // Update countdown every second
    
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', loadLaunches);
});

// Load launches from API or use sample data
function loadLaunches() {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'flex';
    
    fetch(API_URL + '?limit=20', {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => {
        if (!response.ok) throw new Error('API failed');
        return response.json();
    })
    .then(data => {
        console.log('✅ Loaded from API:', data.result.length, 'launches');
        allLaunches = normalizeData(data.result);
        render();
    })
    .catch(error => {
        console.warn('⚠️ Using sample data:', error);
        allLaunches = JSON.parse(JSON.stringify(sampleLaunches));
        render();
    });
}

// Normalize API response to our format
function normalizeData(launches) {
    return launches.map(l => ({
        name: l.mission?.name || 'Unknown',
        date: new Date(l.date_str || l.win_open_str),
        rocket: l.rocket?.name || 'Unknown',
        provider: l.provider?.name || 'Unknown',
        location: l.pad?.location?.name || 'Unknown',
        status: l.status || 'TBD'
    }));
}

// Render the UI
function render() {
    nextLaunch = allLaunches[0] || null;
    renderNextLaunch();
    renderList();
    updateLastUpdate();
    
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'none';
}

// Render next launch card
function renderNextLaunch() {
    const container = document.getElementById('nextLaunch');
    
    if (!nextLaunch) {
        container.innerHTML = '<div class="placeholder">Loading launch data...</div>';
        return;
    }
    
    const dateStr = nextLaunch.date.toLocaleString();
    
    container.innerHTML = `
        <div class="launch-header">
            <div class="launch-info">
                <div class="launch-info-label">Mission</div>
                <div class="launch-info-value">${nextLaunch.name}</div>
            </div>
            <div class="launch-info">
                <div class="launch-info-label">Rocket</div>
                <div class="launch-info-value">${nextLaunch.rocket}</div>
            </div>
            <div class="launch-info">
                <div class="launch-info-label">Provider</div>
                <div class="launch-info-value">${nextLaunch.provider}</div>
            </div>
            <div class="launch-info">
                <div class="launch-info-label">Launch Time</div>
                <div class="launch-info-value">${dateStr}</div>
            </div>
        </div>
        <div class="launch-description">
            📍 <strong>Launch Site:</strong> ${nextLaunch.location}
        </div>
    `;
}

// Render launches list
function renderList() {
    const container = document.getElementById('launchesList');
    
    if (!allLaunches || allLaunches.length === 0) {
        container.innerHTML = '<div class="placeholder">No launches available</div>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < Math.min(10, allLaunches.length); i++) {
        const launch = allLaunches[i];
        const statusClass = launch.status === 'Go' ? 'status-upcoming' : 'status-hold';
        html += `
            <div class="launch-card">
                <h3>🚀 ${launch.name}</h3>
                <div class="launch-detail">
                    <span class="launch-label">Rocket:</span>
                    <span class="launch-value">${launch.rocket}</span>
                </div>
                <div class="launch-detail">
                    <span class="launch-label">Provider:</span>
                    <span class="launch-value">${launch.provider}</span>
                </div>
                <div class="launch-detail">
                    <span class="launch-label">Location:</span>
                    <span class="launch-value">${launch.location}</span>
                </div>
                <div class="launch-detail">
                    <span class="launch-label">Time:</span>
                    <span class="launch-value">${launch.date.toLocaleString()}</span>
                </div>
                <span class="launch-status ${statusClass}">${launch.status}</span>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Update countdown
function updateCountdown() {
    if (!nextLaunch) return;
    
    const now = new Date().getTime();
    const launch = nextLaunch.date.getTime();
    const diff = launch - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(d).padStart(2, '0');
    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}

// Update last updated time
function updateLastUpdate() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleTimeString();
}

console.log('✅ Launch Tracker script loaded');
