let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(ms) {
  let date = new Date(ms);
  let hours = String(date.getUTCHours()).padStart(2, '0');
  let minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let seconds = String(date.getUTCSeconds()).padStart(2, '0');
  let milliseconds = String(ms % 1000).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startStopBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  startStopBtn.textContent = "Start";
  isRunning = false;
  // document.getElementById("laps").innerHTML = ""; // Clear laps if using
}

// Optional Lap Functionality
// function recordLap() {
//   if (isRunning) {
//     const lapTime = formatTime(elapsedTime);
//     const lapItem = document.createElement("li");
//     lapItem.textContent = lapTime;
//     document.getElementById("laps").appendChild(lapItem);
//   }
// }

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
// document.getElementById("lapBtn").addEventListener("click", recordLap);

updateDisplay();
