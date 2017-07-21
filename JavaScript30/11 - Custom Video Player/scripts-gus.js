
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
//const controls = document.querySelector('.constrols');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playPause = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skips = document.querySelectorAll('.player__button[id]');


function stopGo () {
  if (video.paused)  {
    video.play(); 
    playPause.textContent = '►' 
  } else {
    video.pause(); 
    playPause.textContent = '❚❚'
  }
}

function setRange () {
  //  As we have more than one possible fired range, we need to set on each one we are going to chance the value
  video[this.name] = this.value;
}

function skipTime () {
  video.currentTime += Number(this.id);
}

function progressLength () {
  var percent = (this.currentTime / this.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function videoTime (e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}


video.addEventListener('click', stopGo);
playPause.addEventListener('click', stopGo);
skips.forEach(s => s.addEventListener('click', skipTime));
video.addEventListener('timeupdate', progressLength);

ranges.forEach(r => r.addEventListener('change', setRange));
ranges.forEach(r => r.addEventListener('mousemove', setRange));

progress.addEventListener('click', videoTime);
var flagP = false;
progress.addEventListener('mousedown', () => flagP = true);
progress.addEventListener('mouseup', () => flagP = false);
progress.addEventListener('mousemove', (e) => flagP && videoTime(e));


