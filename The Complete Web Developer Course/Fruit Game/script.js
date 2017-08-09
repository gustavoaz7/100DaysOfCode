const game = document.querySelector('#game')
const score = document.querySelector('#score')
const scoreVal = document.querySelector('#scoreValue')
const scoreBest = document.querySelector('#bestScore')
const life = document.querySelector('#life')
const instruction = document.querySelector('#instruction')
const start = document.querySelector('#start')
const gameover = document.querySelector('#gameOver')
const finalScore = document.querySelector('#finalScore')

scoreVal.textContent = 0;


function startGame() {
	AnimateInstr();
	setTimeout(function() {
	console.log('a')






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

start.addEventListener('click', startGame)