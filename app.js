const gameBoard = document.getElementById('gameboard');

const startPieces = [
    blackPieces['rook'], blackPieces['knight'], blackPieces['bishop'], blackPieces['queen'], blackPieces['king'], blackPieces['bishop'], blackPieces['knight'], blackPieces['rook'],
    blackPieces['pawn'], blackPieces['pawn'], blackPieces['pawn'], blackPieces['pawn'], blackPieces['pawn'], blackPieces['pawn'], blackPieces['pawn'], blackPieces['pawn'],
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    whitePieces['pawn'], whitePieces['pawn'], whitePieces['pawn'], whitePieces['pawn'], whitePieces['pawn'], whitePieces['pawn'], whitePieces['pawn'], whitePieces['pawn'],
    whitePieces['rook'], whitePieces['knight'], whitePieces['bishop'], whitePieces['queen'], whitePieces['king'], whitePieces['bishop'], whitePieces['knight'], whitePieces['rook'],
];

function createBoard() {
    let counter = 0 
    let idx = 0
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.innerHTML = startPiece
        square.classList.add('square')
        square.setAttribute('square-id', i)

        const row = Math.floor( (63 - i) / 8) + 1
        if(row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "light" : "dark")

        } else {
            square.classList.add(i % 2 === 0 ? "dark": "light")
        }
        gameBoard.append(square)
    })
    console.log(counter)
}

createBoard();
