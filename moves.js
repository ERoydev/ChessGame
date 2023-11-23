const MOVES = {
  'forward': forward,
  'line': line,
  'diagonal': diagonal,
  'horse': horse,
  'king': king,
}

const pawnForward = 8;

function forward(turn, currentSquareId, pieceClassList) {
  let moves = []

  const doubleMove = (type) => {
    if(!pieceClassList.contains('moved'))
      if(type === 'negative') {
        moves.push(Number(currentSquareId) - pawnForward * 2)
      } else if(type == 'positive') {
        moves.push(Number(currentSquareId) + pawnForward * 2)
      }
  }
  
  if(turn == 'w') {
    doubleMove('negative');
    moves.push(Number(currentSquareId) - pawnForward);

  } else if (turn == 'b') {
    doubleMove('positive');
    moves.push(Number(currentSquareId) + pawnForward);
  }

  return moves
}

function line(turn, currentSquareId, pieceClassList){
  return
}

function diagonal(turn, currentSquareId, pieceClassList) {
  return
}

function horse(turn, currentSquareId, pieceClassList) {
  return
}

function king(turn, currentSquareId, pieceClassList) {
  return
}

