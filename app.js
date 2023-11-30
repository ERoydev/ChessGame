
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
        square.setAttribute('row', Math.ceil((i + 0.8) / 8))


        // ADD POSSIBLE MOVES FOR EACH PIECE IN EACH CLASSLIST
        const squarePiece = square.children[0]
        if(squarePiece !== undefined ) {
            let pieceType = squarePiece.id;
            
            if(pieceType == 'pawn') {
                squarePiece.classList.add('forward')
            }

            if(pieceType == 'queen') {
                squarePiece.classList.add('line', 'diagonal')
            }

            if(pieceType == 'bishop') {
                squarePiece.classList.add('diagonal')
            }

            if(pieceType == 'knight') {
                squarePiece.classList.add('horse')
            }

            if(pieceType == 'rook') {
                squarePiece.classList.add('line')
            }

            if(pieceType == 'king') {
                squarePiece.classList.add('king')
            }
        }

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


// Attach MOVE event on every square 
const allSquares = document.querySelectorAll("#gameboard .square");

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
    square.addEventListener('click', handleClick)
})

let draggedElement
let startPositionId
// END OF EVENT ATTACH


// Player Turn logic
function changeTurn (){
    if(playerTurn == "w") {
        playerTurn = "b";

    } else {
        playerTurn = 'w';
    }

    return playerTurn;
}

function showTurn(currTurn) {
    let turnDisplay = document.getElementById('turns');
    if(currTurn == 'w') {
        turnDisplay.innerText = "White Turn";
    } else {
        turnDisplay.innerText = "Black Turn";
    }
}
// END OF PLAYER TURN LOGIC


// Move Piece Functions -------------------
function handleClick(e) {
}

function dragStart(e) {
    draggedElement = e.target
    startPositionId = e.currentTarget.getAttribute('square-id')
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
    // When player try to move before his turn
    if(!draggedElement.classList.contains(current_turn)) { 
        return
    }

    // If dragged element is piece add it to the new square and switch turns with players
    if(!e.toElement.classList.contains('piece')){

        let moveType = draggedElement.classList[2]
        let pieceClassList = draggedElement.classList
        let possibleMoves = Array.from(MOVES[moveType](current_turn, startPositionId, pieceClassList))
        const dropToElement = e.toElement.getAttribute('square-id')
        
        // THIS FOR CAN BE OPTIMISED --- Check if attendend move is in possible moves array
        for(let move of possibleMoves) {
            if(move == dropToElement) {
                // when piece moved from its starting position add class moved
                draggedElement.classList.add('moved')

                // add piece div into square div when moved
                e.currentTarget.append(draggedElement);
                
                // Change turn after player (drop/move a piece).
                playerTurn = changeTurn();
                
                // To display turn on window
                showTurn(playerTurn);
                break;
            }
        }
    }
}
// End of Move Piece Functions -------------------
