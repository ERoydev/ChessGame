const gameBoard = document.getElementById('gameboard');
let playerTurn = 'w';

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
        square.firstChild?.setAttribute('draggable', true)
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



const allSquares = document.querySelectorAll("#gameboard .square");


allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedElement

function changeTurn (){
    if(playerTurn == "w") {
        playerTurn = "b";

    } else {
        playerTurn = 'w';
    }

    return playerTurn;
}



// Here is the logic to move pieces and stop if on the square already have piece
function dragStart(e) {
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()  
}

function dragDrop (e) {
    e.stopPropagation()

    // If draged element is just square return and dont go bellow this line
    if(!draggedElement.classList.contains('piece')) {
        return
    }

    current_turn = playerTurn;
    
    if(draggedElement.classList.contains(current_turn)) { 
        // If dragged element is piece add it to the new square and switch turns with players
        if(!e.toElement.classList.contains('piece')){
            e.currentTarget.append(draggedElement);
            
            // Change turn after player (drop/move a piece).
            changeTurn();

            // To display turn on window
            let turnDisplay = document.getElementById('turns');
            if(current_turn == 'w') {
                turnDisplay.innerText = "White Turn";
            } else {
                turnDisplay.innerText = "Black Turn";
            }
        }
    }
}
