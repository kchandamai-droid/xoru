// script.js

// Clock variables
let clockContainer = document.getElementById('clock');
let toggleButton = document.getElementById('format-toggle');
let darkModeButton = document.getElementById('dark-mode-toggle');

// Timezone data
const timezones = {
    'UTC': 0,
    'GMT': 0,
    'EST': -5,
    'CST': -6,
    'MST': -7,
    'PST': -8,
    'IST': 5.5,
    // Add more time zones as needed
};

let currentFormat = '24'; // Default format is 24-hour
let isDarkMode = false; // Default theme is light

// Load user preferences from local storage
if (localStorage.getItem('timeFormat')) {
    currentFormat = localStorage.getItem('timeFormat');
}
if (localStorage.getItem('darkMode')) {
    isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
}

// Function to format time
function formatTime(date) {
    let options;
    if (currentFormat === '12') {
        options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    } else {
        options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    }
    return date.toLocaleString(undefined, options);
}

// Update clock every second
function updateClock() {
    const now = new Date();
    // Adjusting for the selected timezone
    const timezoneOffset = timezones['UTC']; // Replace with user preferred timezone if changed
    now.setHours(now.getHours() + timezoneOffset);
    clockContainer.innerText = formatTime(now);
}

// Event listener for format toggle
toggleButton.addEventListener('click', () => {
    currentFormat = currentFormat === '12' ? '24' : '12';
    localStorage.setItem('timeFormat', currentFormat);
    updateClock();
});

// Event listener for dark mode toggle
darkModeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
});

// Initialize the clock and set the update interval
setInterval(updateClock, 1000);
updateClock();
