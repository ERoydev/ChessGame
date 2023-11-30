const MOVES = {
  'forward': forward,
  'line': line,
  'diagonal': diagonal,
  'horse': horse,
  'king': king,
}

const upOneSquare = -8;
const leftOneSquare = -1;
const rightOneSquare = 1;
const downOneSquare = 8;


function forward(turn, currentSquareId, pieceClassList) {
  let moves = []

  const doubleMove = (type) => {
    if(!pieceClassList.contains('moved'))
      if(type === 'negative') {
        moves.push(Number(currentSquareId) + upOneSquare * 2)
      } else if(type == 'positive') {
        moves.push(Number(currentSquareId) + downOneSquare * 2)
      }
  }
  
  if(turn == 'w') {
    doubleMove('negative');
    moves.push(Number(currentSquareId) + upOneSquare);

  } else if (turn == 'b') {
    doubleMove('positive');
    moves.push(Number(currentSquareId) + downOneSquare);
  }

  return moves
}

function line(turn, currentSquareId, pieceClassList){
  let moves = [];
  const squareId = Number(currentSquareId)

    for(let direct of [leftOneSquare, rightOneSquare, upOneSquare, downOneSquare]) {
      let result = directionMove(squareId, direct)
      moves = moves.concat(result)
    }

  return moves
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


// HELPER METHODS

function directionMove(current_squareId, direction) {
  let currentSquareId = current_squareId
  let leftBorder = currentSquareId - currentSquareId % 8
  let rightBorder = 7 - currentSquareId % 8 + currentSquareId
  let oldSquare = currentSquareId
  const currentRow = document.querySelectorAll(`[square-id='${currentSquareId}']`)[0].getAttribute('row')

  let moves = [];

  for(let i = 0; i < 8; i ++) {
    currentSquareId += direction;

    // Check if curret id is outside the board
    if(currentSquareId > 63 || currentSquareId < 0) {
      break
    }

    // When im in left border check if i move on the same row or if i move other row i need to be in the same column
    if(oldSquare % 8 == 0) {
      let nextRow = document.querySelectorAll(`[square-id='${currentSquareId}']`)[0].getAttribute('row')
      if(nextRow != currentRow && currentSquareId % 8 != 0) {
        break;
      }
    }

    // When im in right border check if i move on the same row or if i move other row i need to be in the same column
    if(oldSquare % 8 == 7) {
      let nextRow = document.querySelectorAll(`[square-id='${currentSquareId}']`)[0].getAttribute('row')
      if(nextRow != currentRow && currentSquareId % 8 != 7) {
        break;
      }
    }

    let element = document.querySelector(`[square-id='${currentSquareId}']`);

    if(element.children.length > 0) {
      if(element.children[0].classList.contains('piece')) {
        break;
      }
    }

    moves.push(currentSquareId);
  }
  return moves
}