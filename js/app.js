// Launch Tracker - Real-time Space Dashboard
// Data from RocketLaunch.Live API

const API_URL = 'https://api.rocketlaunch.live/v0/launches';
const REFRESH_INTERVAL = 60000; // 1 minute
const COUNTDOWN_INTERVAL = 1000; // 1 second

let allLaunches = [];
let nextLaunch = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Launch Tracker Initialized');
    fetchLaunches();
    
    // Set up auto-refresh
    setInterval(fetchLaunches, REFRESH_INTERVAL);
    
    // Set up countdown update
    setInterval(updateCountdown, COUNTDOWN_INTERVAL);
    
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
        console.log('🔄 Manual refresh');
        fetchLaunches();
    });
});

// Fetch launches from API
async function fetchLaunches() {
    try {
        console.log('📡 Fetching launches...');
        document.getElementById('loading').style.display = 'flex';
        
        // Add limit parameter to get more launches
        const response = await fetch(`${API_URL}?limit=20`);
        
        if (!response.ok) throw new Error('Failed to fetch launches');
        
        const data = await response.json();
        allLaunches = data.result || [];
        
        console.log(`✅ Loaded ${allLaunches.length} launches`);
        
        // Get next launch
        nextLaunch = allLaunches.length > 0 ? allLaunches[0] : null;
        
        // Render UI
        renderNextLaunch();
        renderLaunchesList();
        updateLastUpdate();
        
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error('❌ Error fetching launches:', error);
        document.getElementById('loading').style.display = 'none';
        
        // Show error message
        document.getElementById('nextLaunch').innerHTML = `
            <div class="placeholder" style="color: #ff6b6b;">
                ⚠️ Failed to load launch data. Please try again later.
            </div>
        `;
    }
}

// Render next launch
function renderNextLaunch() {
    const container = document.getElementById('nextLaunch');
    
    if (!nextLaunch) {
        container.innerHTML = '<div class="placeholder">No upcoming launches</div>';
        return;
    }
    
    const launchDate = new Date(nextLaunch.date_str || nextLaunch.win_open_str);
    const rocket = nextLaunch.rocket?.name || 'Unknown Rocket';
    const provider = nextLaunch.provider?.name || 'Unknown Provider';
    const location = nextLaunch.pad?.location?.name || 'Unknown Location';
    const mission = nextLaunch.mission?.name || 'Unknown Mission';
    
    container.innerHTML = `
        <div class="launch-header">
            <div class="launch-info">
                <div class="launch-info-label">Mission</div>
                <div class="launch-info-value">${mission}</div>
            </div>
            <div class="launch-info">
                <div class="launch-info-label">Rocket</div>
                <div class="launch-info-value">${rocket}</div>
            </div>
            <div class="launch-info">
                <div class="launch-info-label">Provider</div>
                <div class="launch-info-value">${provider}</div>
            </div>
            <div class="launch-info">
                <div class="launch-info-label">Launch Time</div>
                <div class="launch-info-value">${launchDate.toLocaleString()}</div>
            </div>
        </div>
        <div class="launch-description">
            📍 <strong>Launch Site:</strong> ${location}
        </div>
    `;
}

// Render launches list
function renderLaunchesList() {
    const container = document.getElementById('launchesList');
    
    if (allLaunches.length === 0) {
        container.innerHTML = '<div class="placeholder">No launches available</div>';
        return;
    }
    
    const launchCards = allLaunches.slice(0, 10).map(launch => {
        const launchDate = new Date(launch.date_str || launch.win_open_str);
        const rocket = launch.rocket?.name || 'Unknown';
        const provider = launch.provider?.name || 'Unknown';
        const location = launch.pad?.location?.name || 'Unknown';
        const mission = launch.mission?.name || 'Unknown Mission';
        const status = launch.status || 'TBD';
        
        const statusClass = status === 'Go' ? 'status-upcoming' : 'status-hold';
        
        return `
            <div class="launch-card">
                <h3>🚀 ${mission}</h3>
                <div class="launch-detail">
                    <span class="launch-label">Rocket:</span>
                    <span class="launch-value">${rocket}</span>
                </div>
                <div class="launch-detail">
                    <span class="launch-label">Provider:</span>
                    <span class="launch-value">${provider}</span>
                </div>
                <div class="launch-detail">
                    <span class="launch-label">Location:</span>
                    <span class="launch-value">${location}</span>
                </div>
                <div class="launch-detail">
                    <span class="launch-label">Launch Time:</span>
                    <span class="launch-value">${launchDate.toLocaleString()}</span>
                </div>
                <span class="launch-status ${statusClass}">${status}</span>
            </div>
        `;
    }).join('');
    
    container.innerHTML = launchCards;
}

// Update countdown timer
function updateCountdown() {
    if (!nextLaunch) return;
    
    const launchDate = new Date(nextLaunch.date_str || nextLaunch.win_open_str);
    const now = new Date();
    const diff = launchDate - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update last updated time
function updateLastUpdate() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    document.getElementById('lastUpdated').textContent = timeStr;
}

console.log('✅ Launch Tracker JavaScript loaded');
