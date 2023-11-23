const piecesTypes = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook', 'pawn'];

function loadPieces (color) {
    let result = {};
    for(let piece of piecesTypes) {
        let pc = `<div class="piece ${color}" id="${piece}"><img src="assets/SVG with shadow/${color}_${piece}_svg_withShadow.svg" height="75" /></div>`;
        result[piece] = pc;
    }
    return result
};

// Take the black and white pieces and collection
const whitePieces = loadPieces('w');
const blackPieces = loadPieces('b');