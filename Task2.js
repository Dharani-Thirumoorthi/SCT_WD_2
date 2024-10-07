// Variables to store time and interval ID
let startTime = 0;
let elapsedTime = 0;
let intervalID;
let isRunning = false;

// Elements
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

// Format time function
function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Start/Stop button functionality
startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalID = setInterval(updateDisplay, 10);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        clearInterval(intervalID);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        startStopBtn.textContent = 'Start';
    }
});

// Update display
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Reset button functionality
resetBtn.addEventListener('click', () => {
    clearInterval(intervalID);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00.000';
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = ''; // Clear lap list
});

// Lap button functionality
lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapItem);
});
