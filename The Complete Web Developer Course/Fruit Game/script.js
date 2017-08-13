const game = document.querySelector('#game')
const score = document.querySelector('#score')
const scoreVal = document.querySelector('#scoreValue')
const scoreBest = document.querySelector('#bestScore')
const life = document.querySelector('#life')
const instruction = document.querySelector('#instruction')
const start = document.querySelector('#start')
const gameover = document.querySelector('#gameOver')
const finalScore = document.querySelector('#finalScore')
const fruit = document.querySelector('.fruit')
const slicesound = document.querySelector('#slicesound')
const fruits = [
	'https://vignette3.wikia.nocookie.net/fruitninja/images/1/16/Kiwi_Fruit.svg',
	'https://vignette2.wikia.nocookie.net/fruitninja/images/0/07/Pear.svg',
	'https://vignette3.wikia.nocookie.net/fruitninja/images/e/e2/Strawberry.svg',
	'https://vignette1.wikia.nocookie.net/fruitninja/images/d/d1/Cherry.svg',
	'https://vignette2.wikia.nocookie.net/fruitninja/images/4/43/Orange.png',
	'https://vignette1.wikia.nocookie.net/fruitninja/images/e/e6/Plum.png',
	'https://vignette4.wikia.nocookie.net/fruitninja/images/3/34/Lime.png'
];
let lastFruit, step, trials, scoreCount = 0;

scoreVal.textContent = scoreCount;


function startGame() {
	// Setting up starting configuration
	trials = 3;
	step = 0;
	scoreCount = 0;
	while (life.childElementCount < 3) $('#life').append('<img src="http://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/48/heart-icon.png" alt="">');
	// Removing any configuration from previous games
	if (gameover.classList) {
		gameover.classList.remove('active');
		game.style.filter = 'grayscale(0%)';
	}
	clearInterval(fruitDown)

	// Animating introduction
	animateInstr();
	// Game starts after the initial animation
	setTimeout(() => {
		styleStart();
		positionFruit();
		fruitDown();
		fruit.addEventListener('mouseover', fruitSlice)

	}, 1250)
}

function animateInstr() {
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
	start.classList.add('active');
}

function pickFruit() {
	let i = Math.floor(Math.random()*fruits.length);
	if (lastFruit === fruits[i]) pickFruit();
	lastFruit = fruits[i];
	return fruits[i];
}

function horizPosition() {
	let area = game.getBoundingClientRect();
	let item = fruit.getBoundingClientRect();
	return Math.random()*(area.width - item.width);
}

function positionFruit() {
	fruit.setAttribute('src', pickFruit())
	fruit.style.left = `${horizPosition()}px`;
	fruit.style.top = `-${fruit.offsetHeight}px`;
	// $(#game).append(`<img class="fruit" src="${pickFruit()}" >`)  -  This method allows to appear more than one fruit in game at the same time
}

function fruitDown() {
	let randStep = 2 + Math.round(Math.random()*(1 + Math.round(Math.random()*9)));
	let fruitDown = setInterval(() => {
		step += randStep;
		fruit.style.top = `${-fruit.offsetHeight + step}px`;
		if (fruit.offsetTop >= game.offsetHeight) {
			if (trials > 1) {
				trials--;
				life.lastElementChild.remove();
				return newFruit();
			}
			life.lastElementChild.remove();
			clearInterval(fruitDown)
			gameOverF();
		}
	}, 10)
}

function newFruit() {
	step = 0;
	randStep = 2 + Math.round(Math.random()*(1 + Math.round(Math.random()*9)));
	positionFruit();
}

function fruitSlice() {
	scoreCount++;
	scoreVal.textContent = scoreCount;
	slicesound.currentTime = 0;
	slicesound.play();
	$(".fruit").hide("explode", 500);
	setTimeout(() => {newFruit(); $(".fruit").show()}, 500) ;
}

function gameOverF() {
	gameover.classList.add('active');
	game.style.filter = 'grayscale(30%)';
	start.querySelector('p').textContent = 'Start Game';
	start.classList.remove('active');
}

start.addEventListener('click', startGame)



