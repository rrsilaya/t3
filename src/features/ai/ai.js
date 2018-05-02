const checkWinner = state => {
  const winnerX = [
    'XXX......',
    '...XXX...',
    '......XXX',
    'X..X..X..',
    '.X..X..X.',
    '..X..X..X',
    'X...X...X',
    '..X.X.X..'
  ];
  const winnerO = [
    'OOO......',
    '...OOO...',
    '......OOO',
    'O..O..O..',
    '.O..O..O.',
    '..O..O..O',
    'O...O...O',
    '..O.O.O..'
  ];
  const draw = '[XO]{9}';
  const winX = winnerX
    .map(winner => state.match(winner))
    .some(element => !!element);
  const winO = winnerO
    .map(winner => state.match(winner))
    .some(element => !!element);
  const draw = state.match(draw);
  if (winnerX) return 'X';
  else if (winnerO) return 'O';
  else if (draw) return 'draw';
  else return 'None';
};
