const winningPlay = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const human = 'X', bot = 'O';
let humanPlay = [], botPlay = [];
let gameboard = new Array(9).fill(0);
let turn = 0;



newGame();

function renderBoard() {
  document.querySelectorAll('#board>span').forEach((cell, i) => 
    !gameboard[i] ? cell.textContent = '' : cell.textContent = gameboard[i]
  )
}

function newGame() {
  gameboard = new Array(9).fill(0);
  document.querySelectorAll('#board>span').forEach((cell, i) => cell.addEventListener('click', humanTurn))
  turn = 0;
  renderBoard(gameboard)
}

function humanTurn(e) {
  [gameboard[e.target.id], e.target.textContent] = [human, human];
  humanPlay.push(Number(e.target.id));
  turn++;
  botTurn();
}

function botTurn() {

}

function availableMoves() {
  let av = gameboard.map((cell, i) => !cell ? i : null).filter(x => x != null);
  if (!av) tieGame();
  return av
}

function isWin(plays) {
  return winningPlay.some(win => win.every(w => plays.includes(w)))
}

function tieGame() {
  return turn >= 9 ? console.log('tie game') : console.log('game continues');
}