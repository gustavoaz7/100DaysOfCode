const onOff = document.querySelector('#switch')
let onFlag = false;
const colors = document.querySelectorAll('.colors')
const start = document.querySelector('#start')
const strict = document.querySelector('#strict')
let strictFlag = false;
const led = document.querySelector('#led')
const display = document.querySelector('#counter>h1')
let counter;
const speed = {
  Easy: [2000, 1750, 1500, 1250],
  Medium: [1250, 1000, 750, 500],
  Hard: [800, 600, 400, 200]
};
let difficulty = 'Medium';
let sequence;


document.querySelectorAll('input').forEach(level => 
  level.addEventListener('click', (e) =>
    difficulty = e.target.value
  )
)

onOff.addEventListener('click', isOn);

function isOn() {
  onFlag = !onFlag;
  if (onFlag) {
    onOff.style.transform = 'translateX(100%)';
    renderDisplay('--');
    document.querySelectorAll('.btn').forEach(b => {
      b.addEventListener('click', (e) => {
        console.log(e.target);
        e.target === start ? startGame() : isStrict()
      })
    })
  } else {
    onOff.style.transform = 'translateX(0%)';
    renderDisplay(' ');
  }
}

function isStrict() {
  strictFlag = !strictFlag;
  console.log(strictFlag);
  strictFlag ? led.style.background = 'red' : led.style.background = 'maroon';
}

function startGame() {
  counter = 1;
  sequence = new Array(20).fill(0).map(x => Math.floor(Math.random() * 4));
  gameplay(counter);
}

function gameplay(n) {
  renderDisplay(n);
  let i = 0;
  let seqStart = setInterval(() => {
    blink(sequence[i]);
    i++;
    if (i === n) clearInterval(seqStart)
    // add time limit for user press
  }, timeStep()/2)
}

function userplay() {
  
}

colors.forEach(color => 
  color.addEventListener('mousedown', (e) => 
  console.log(e.target)
  )
)
// UTILITIES

function timeStep(){
  return counter < 4 ? speed[difficulty][0] :
         counter < 8 ? speed[difficulty][1] :
         counter < 12 ? speed[difficulty][2] :
         speed[difficulty][3];
}

function blink(id) {
  console.log(id);
  //document.getElementsByClassName(id)[0].play();
  document.getElementById(id).classList.add('active');
  let removeBlink = setTimeout(() => document.getElementById(id).classList.remove('active'), timeStep())
}

function renderDisplay(counter) {
  typeof counter === 'string' ? display.textContent = counter :
  counter < 10 ? display.textContent = `0${counter}` : display.textContent = counter;
}
