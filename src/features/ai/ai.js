// const readline = require('readline-sync');

export const checkWinner = (piece, state) => {
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

export const AICaller = (piece, state, isRandTurn) => {
  let index;

  if (isRandTurn) {
    do {
      index = Math.floor(Math.random() * 9);
    } while (state[index] !== ' ');
  } else {
    index = aimove(piece, state).boardIndex;
  }

  const currentState = state.split('');
  currentState[index] = piece;

  return currentState.join('');
};

function aimove(piece, state, alpha = -2, beta = 2) {
  const nextPiece = piece === 'X' ? 'O' : 'X';
  let score = checkWinner(nextPiece, state);

  console.log(alpha, beta);
  if (score !== 'None' || alpha > beta) {
    return { score };
  }

  const availableMoves = getAvailableMoves(piece, state);

  const boardStates = availableMoves.map(boardIndex => {
    const currentState = state.split('');
    currentState[boardIndex] = piece;

    if (nextPiece === 'O') {
      // Alpha, max
      score = aimove(nextPiece, currentState.join(''), score === 'None' ? alpha : Math.min(score, alpha), beta);
      console.log('>> ', score);
      score = score.score;
    } else {
      // Beta, min
      score = aimove(nextPiece, currentState.join(''), alpha, score === 'None' ? beta : Math.min(score, beta));
      console.log('>> ', score);
      score = score.score;
    }

    // const { score } = aimove(nextPiece, currentState.join('')).score;
    return { score, boardIndex };
  });

  const scores = boardStates.reduce((prev, curr) => {
    prev.push(curr.score);
    return prev;
  }, []);

  let index;
  if (piece === 'O') {
    index = scores.indexOf(Math.max(...scores));
  } else {
    index = scores.indexOf(Math.min(...scores));
  }
  return boardStates[index];
}

// let piece = '';
// let state = '         ';
// // AICaller(piece, state);
// let lastpiece;
// let status;
// for (let i = 0; i < 9; i++) {
//   piece = i % 2 === 0 ? 'X' : 'O';
//   console.log(
//     `${piece}\n
//     =====
//     |${state.slice(0, 3)}|
//     |${state.slice(3, 6)}|
//     |${state.slice(6, 9)}|
//     =====`
//   );
//   if (true || i % 2 !== 0) {
//     state = AICaller(piece, state);
//   } else {
//     let move = parseInt(readline.question('Move: '), 10);
//     state = state.split('');
//     state[move] = piece;
//     state = state.join('');
//   }
//   status = checkWinner(piece, state);
//   if (status != 'None') {
//     console.log(
//       `
//       =====
//       |${state.slice(0, 3)}|
//       |${state.slice(3, 6)}|
//       |${state.slice(6, 9)}|
//       =====`
//     );
//     break;
//   }
//   lastpiece = piece;
// }
