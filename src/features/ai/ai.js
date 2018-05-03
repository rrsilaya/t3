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
  if (winX) return piece === 'X' ? 1 : -1;
  else if (winO) return piece === 'Y' ? 1 : -1;
  else if (draw) return 0;
  else return 'None';
};

const getNextStates = (piece, state) => {
  const nextMoves = state.split('').reduce((acc, current, index) => {
    if (current === ' ') acc.push(index);
    return acc;
  }, []);
  return nextMoves.map(move => {
    const nextState = state.split('');
    nextState[move] = piece;
    return nextState.join('');
  });
};

const AICaller = (piece, state) => {
  const nextStates = getNextStates(piece, state);
  console.log(nextStates);
  const result = aimove(0, piece, state);
  console.log(result);
  return nextStates[result];
};

function aimove(level, piece, state) {
  const nextPiece = piece === 'X' ? 'O' : 'X';
  const score = checkWinner(nextPiece, state);
  if (score === 'None') {
    const moves = getNextStates(piece, state).map(nextState => {
      return aimove(level + 1, nextPiece, nextState);
    });
    let bestMove;
    if (piece === 'X') {
      bestMove = moves.indexOf(Math.min(...moves));
    } else {
      bestMove = moves.indexOf(Math.max(...moves));
    }
    return bestMove;
  } else return score;
}

let piece;
let lastpiece;
let state = '         ';
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
    let move = parseInt(readline.question('Move: '), 10);
    state = state.split('');
    state[move] = piece;
    state = state.join('');
  }
  status = checkWinner(piece, state);
  if (status != 'None') {
    console.log(state);
    break;
  }
  lastpiece = piece;
}
