let choice;
var readline = require('readline-sync');
const checkWinner = (piece, state) => {
  const winnerX = [
    /XXX....../,
    /...XXX.../,
    /......XXX/,
    /X..X..X../,
    /.X..X..X./,
    /..X..X..X/,
    /X...X...X/,
    /..X.X.X../
  ];
  const winnerO = [
    /OOO....../,
    /...OOO.../,
    /......OOO/,
    /O..O..O../,
    /.O..O..O./,
    /..O..O..O/,
    /O...O...O/,
    /..O.O.O../
  ];
  const drawRegex = '[XO]{9}';

  const winX = winnerX
    .map(winner => state.match(winner))
    .some(element => !!element);
  const winO = winnerO
    .map(winner => state.match(winner))
    .some(element => !!element);
  const draw = state.match(drawRegex);
  if (winX) return piece === 'X' ? -1 : 1;
  else if (winO) return piece === 'Y' ? -1 : 1;
  else if (draw) return 0;
  else return 'None';
};

const getAvailableMoves = (piece, state) => {
  return state.split('').reduce((acc, current, index) => {
    if (current === ' ') acc.push(index);
    return acc;
  }, []);
};

const AICaller = (piece, state) => {
  const result = aimove(piece, state);
  const currentState = state.split('');
  currentState[choice] = piece;
  const nextState = currentState.join('');
  return nextState;
};

function aimove(piece, state) {
  const nextPiece = piece === 'X' ? 'O' : 'X';
  const score = checkWinner(nextPiece, state);
  if (score !== 'None') {
    return score;
  }
  const availableMoves = getAvailableMoves(piece, state);
  const moves = [];
  const scores = [];
  for (let i = 0; i < availableMoves.length; i++) {
    const move = availableMoves[i];
    const currentState = state.split('');
    currentState[move] = piece;
    const nextState = currentState.join('');
    scores.push(aimove(nextPiece, nextState));
    moves.push(move);
  }
  if (piece === 'O') {
    const index = scores.indexOf(Math.max(...scores));
    choice = moves[index];
    return scores[index];
  } else {
    const index = scores.indexOf(Math.min(...scores));
    choice = moves[index];
    return scores[index];
  }
}
let piece = '';
let state = '         ';
// AICaller(piece, state);
let lastpiece;
let status;
for (let i = 0; i < 9; i++) {
  piece = i % 2 === 0 ? 'X' : 'O';
  console.log(
    `${piece}\n
    =====
    |${state.slice(0, 3)}|
    |${state.slice(3, 6)}|
    |${state.slice(6, 9)}|
    =====`
  );
  if (i % 2 !== 0) {
    state = AICaller(piece, state);
  } else {
    let move = parseInt(readline.question('Move: '), 10) - 1;
    state = state.split('');
    state[move] = piece;
    state = state.join('');
  }
  status = checkWinner(piece, state);
  if (status != 'None') {
    console.log(
      `
      =====
      |${state.slice(0, 3)}|
      |${state.slice(3, 6)}|
      |${state.slice(6, 9)}|
      =====`
    );
    break;
  }
  lastpiece = piece;
}
