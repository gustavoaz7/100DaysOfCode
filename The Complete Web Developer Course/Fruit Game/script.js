const game = document.querySelector('#game')
const score = document.querySelector('#score')
const scoreVal = document.querySelector('#scoreValue')
const scoreBest = document.querySelector('#bestScore')
const life = document.querySelector('#life')
const instruction = document.querySelector('#instruction')
const start = document.querySelector('#start')
const gameover = document.querySelector('#gameOver')
const finalScore = document.querySelector('#finalScore')

const fruits = [
	'https://vignette3.wikia.nocookie.net/fruitninja/images/1/16/Kiwi_Fruit.svg',
	'https://vignette2.wikia.nocookie.net/fruitninja/images/0/07/Pear.svg',
	'https://vignette3.wikia.nocookie.net/fruitninja/images/e/e2/Strawberry.svg',
	'https://vignette1.wikia.nocookie.net/fruitninja/images/d/d1/Cherry.svg',
	'https://vignette2.wikia.nocookie.net/fruitninja/images/4/43/Orange.png',
	'https://vignette2.wikia.nocookie.net/fruitninja/images/4/43/Orange.png',
	'https://vignette1.wikia.nocookie.net/fruitninja/images/e/e6/Plum.png',
	'https://vignette4.wikia.nocookie.net/fruitninja/images/3/34/Lime.png'
];
let lastFruit;

scoreVal.textContent = 0;


function startGame() {
	AnimateInstr();
	setTimeout(function() {
	styleStart();
	setInterval(function() {
		instruction.append(`<img src="${pickFruit()}" >`);
	}, 1000)






	}, 1250)
}

function AnimateInstr() {
	instruction.classList.add('active');
	instruction.animate([{
		transform: 'translateX(-100%) scale(0.3)',
		opacity: 0
	}, {
		transform: 'translateX(0%) scale(1)',
		opacity: 0.95
	}], 250);
	setTimeout(() => instruction.animate([{
			transform: 'translateX(0%) scale(1)',
			opacity: 0.95
		}, {
			transform: 'translateX(100%) scale(0.3)',
			opacity: 0
		}], 250), 1000);
	setTimeout(() => instruction.classList.remove('active'), 1000)
}

function styleStart() {
	start.querySelector('p').textContent = 'Reset Game';
	start.style.transform = 'scale(0.5)';
	start.style.bottom = '0%';
}

function pickFruit() {
	let i = fruits[Math.round(Math.random()*8)];
	if (lastFruit !== i) {
		lastFruit = i;
		return i;
	}
	pickFruit();
}

start.addEventListener('click', startGame)


