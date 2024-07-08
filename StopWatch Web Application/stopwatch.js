// JavaScript for Stopwatch functionality

let startTime, updatedTime, difference, tInterval, savedTime = 0, running = false;
const timeDisplay = document.getElementById('timeDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

function startPause() {
  if (!running) {
    startTime = new Date().getTime() - savedTime;
    tInterval = setInterval(getShowTime, 1);
    running = true;
    startPauseBtn.innerHTML = '<img aria-hidden="true" alt="pause-icon" src="https://openui.fly.dev/openui/24x24.svg?text=⏸️" /> Pause';
  } else {
    clearInterval(tInterval);
    savedTime = difference;
    running = false;
    startPauseBtn.innerHTML = '<img aria-hidden="true" alt="play-icon" src="https://openui.fly.dev/openui/24x24.svg?text=▶️" /> Start';
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  savedTime = 0;
  startPauseBtn.innerHTML = '<img aria-hidden="true" alt="play-icon" src="https://openui.fly.dev/openui/24x24.svg?text=▶️" /> Start';
  timeDisplay.innerHTML = '00:00.00';
  laps.innerHTML = '';
  hourHand.style.transform = 'rotate(0deg)';
  minuteHand.style.transform = 'rotate(0deg)';
  secondHand.style.transform = 'rotate(0deg)';
}

function addLap() {
  if (running) {
    const lapTime = timeDisplay.innerHTML;
    const lapCount = laps.children.length + 1;
    const lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.innerHTML = `Lap ${pad(lapCount)}: ${lapTime}`;
    laps.prepend(lapElement);
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;
  
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  
  const hourAngle = (hours * 30) + (minutes / 2); // Each hour is 30 degrees, plus 0.5 degrees for every minute
  const minuteAngle = (minutes * 6) + (seconds / 10); // Each minute is 6 degrees, plus 0.1 degrees for every second
  const secondAngle = seconds * 6; // Each second is 6 degrees
  
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `rotate(${secondAngle}deg)`;

  timeDisplay.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(difference % 1000, 3)}`;
}

function pad(number, length = 2) {
  return ('0' + number).slice(-length);
}

// Initial setup
reset(); // Reset to initialize the stopwatch display
