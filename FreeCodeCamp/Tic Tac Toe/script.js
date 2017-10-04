const winningPlay = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const human = 'X', bot = 'O';
let botMove;
let gameboard = new Array(9).fill(0);
let turn = 0;



newGame();

function newGame() {
  gameboard = new Array(9).fill(0);
  document.querySelectorAll('#board>span').forEach((cell, i) => {
    cell.addEventListener('click', humanTurn);
    !gameboard[i] ? cell.textContent = '' : cell.textContent = gameboard[i];
  })
  turn = 0;
}

function humanTurn(e) {
  [gameboard[e.target.id], e.target.textContent] = [human, human];
  turn++;
  // win?tie?
  botTurn();
}

function botTurn() {
  minimax(gameboard, bot);
  //console.log(botMove);
  [gameboard[botMove], document.getElementById(botMove).textContent] = [bot, bot];
  turn++;
  // win?tie?
}

// Array of available spots' indexes.
function availableSpots(board) {
  let av = board.map((cell, i) => !cell ? i : null).filter(x => x != null);
  if (!av) tieGame();
  return av
}

function isOver() {

}

function isWin(board, player) {
  // Store played indexes of current player.
  let plays = board.map((cell, i) => cell === player ? i : null).filter(x => x != null);
  return winningPlay.some(win => win.every(w => plays.includes(w)))
}

/*
function isTie() {
  return turn >= 9 ? console.log('tie game') : console.log('game continues');
}
*/


function minimax(board, player) {
  // Checking for terminal states.
  if (isWin(board, human)) {
    return -10
  } else if (isWin(board, bot)) {
    return 10 
  } else if (availableSpots(board).length === 0) {
    return 0
  };

  let [moves, scores] = [ [], [] ];
  // For each of the available spots: 
    // Store index of next move.
    // Call minimax (recurssion) as the other player with the new board.
      // Recurssion - This is repeated until it reaches a terminal state and returns a score.
    // Store score of minimax result.
  availableSpots(board).forEach(spot => {
    board[spot] = player;
    moves.push(spot);
    scores.push(minimax(board, (player === bot) ? human : bot));
    board[spot] = 0;
  });

  // Returns the best move
    // Bot: highest score.    Human: lowest score.
  botMove = player === bot ? moves[scores.indexOf(Math.max(...scores))] : moves[scores.indexOf(Math.min(...scores))];
  return player === bot ? Math.max(...scores) : Math.min(...scores);
};