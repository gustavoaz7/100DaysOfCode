const changeTimeBtns = document.querySelectorAll('.changeTimeBtn')
const session = document.querySelector('#lenS')
const rest = document.querySelector('#lenR')
const sound = document.querySelector('#vol>i')
const reset = document.querySelector('#reset')
const play = document.querySelector('#play')
const clock = document.querySelector('#clock')
const display = document.querySelector('#display')
const timer = document.querySelector('#timer')

let sessionTime = 0.15;
let restTime = 0.15;

// Object of functions for each +/- time button
const changeTime = {
  'plusS': () => {
    if (sessionTime < 60) sessionTime++;
    session.innerHTML = sessionTime;
  },
  'minusS': () => {
  if (sessionTime > 5) sessionTime--;
  session.innerHTML = sessionTime;
  },
  'plusR': () => {
    if (restTime < 30) restTime++;
    rest.innerHTML = restTime;
  },
  'minusR': () => {
    if (restTime > 1) restTime--;
    rest.innerHTML = restTime;
  }
};

// Update session/rest time on setup
changeTimeBtns.forEach(btn => btn.addEventListener('click', () => {
  changeTime[btn.id]();
}))

// Change sound icon
let soundFlag = false;
sound.addEventListener('click', function() {
  soundFlag = !soundFlag;
  if (soundFlag) {
    this.classList.remove('fa-volume-up');
    this.classList.add('fa-volume-off')
  } else {
    this.classList.remove('fa-volume-off');
    this.classList.add('fa-volume-up');
  }
})


play.addEventListener('click', startSession);
reset.addEventListener('click', resetSession);

let sessionLeft, restLeft,  // setInterval variables
    startFlag = false,  // Playing/paused flag
    remaining;  // Remaining session/rest time when interval is cleared
function startSession() {
  if (display.textContent === 'Rest') return startRest();
  
  startFlag = !startFlag;
  if (!startFlag) {  // Pause
    play.textContent = 'PLAY';
    clearInterval(sessionLeft);
  } else {  // Playing
    play.textContent = 'PAUSE';
    display.textContent = 'Session'

    let timeRemaining;
    // If remaining time exists: interval was paused and is returning from where it lasted
    remaining ? timeRemaining = remaining : timeRemaining = sessionTime*60;
    updateTimerDisplay(timeRemaining);

    sessionLeft = setInterval(() => {
      timeRemaining--;
      remaining = timeRemaining;
      if (timeRemaining < 0) {
        clearInterval(sessionLeft);
        remaining = '';
        return startRest();
      }
      updateTimerDisplay(timeRemaining);
      updateBackground(sessionTime*60, timeRemaining, true)
    }, 1000)
  }
}

function startRest() {
  startFlag = !startFlag;
  if (startFlag) {  // Pause
    play.textContent = 'PLAY';
    clearInterval(restLeft);
  } else {  // Playing
    play.textContent = 'PAUSE';
    display.textContent = 'Rest';

    let timeRemaining;
    // If remaining time exists: interval was paused and is returning from where it lasted
    remaining ? timeRemaining = remaining : timeRemaining = restTime*60;
    updateTimerDisplay(timeRemaining);
  
    restLeft = setInterval(() => {
      timeRemaining--;
      remaining = timeRemaining;
      if (timeRemaining < 0) {
        clearInterval(restLeft);
        remaining = '';
        display.textContent = 'Session';
        return startSession();
      }
      updateTimerDisplay(timeRemaining);
      updateBackground(sessionTime*60, timeRemaining, false)
    }, 1000)
  }
}

// Clear all and set it to initial state
function resetSession() {
  clearInterval(sessionLeft);
  clearInterval(restLeft);
  remaining = '';
  startFlag = false;
  play.textContent = 'PLAY';
  display.textContent = 'Session';
  timer.innerHTML = `${sessionTime}:00`;
  clock.style.background = `radial-gradient(red, red 0%, transparent 5%, transparent)`;
}

function updateTimerDisplay(timeRemaining) {
  let m = Math.floor(timeRemaining/60)
  let s = timeRemaining % 60;
  timer.innerHTML = `${m}:${s < 10 ? '0'+s : s}`;
}

function updateBackground(total, remain, toCenter) {
  let percent;
  toCenter ? percent = (1 - remain / total) * 70 : percent = remain / total * 70;
  console.log(total, remain, percent)
  clock.style.background = `radial-gradient(red, red ${percent-10}%, transparent ${percent+5}%, transparent)`;
}