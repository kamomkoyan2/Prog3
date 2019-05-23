var side = 25;
var socket = io();


function setup() {
    frameRate(5);
    createCanvas(20 * side, 20 * side);
    background('#acacac');
    socket.on("ugharkum em matrix nkari", matrixDraw)
}


function matrixDraw(tvyal) {
    matrix = tvyal.matrix;
    exanak = tvyal.season;

    // matrix = data.matrix;
    //  createCanvas(matrix[0].length * side, matrix.length * side)

console.log(matrix);


    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");

            } else if (matrix[i][j] == 2) {
                fill("orange");

            } else if (matrix[i][j] == 0) {
                fill('#acacac');

            }
            else if (matrix[i][j] == 3) {
                fill("red");
            }
            else if (matrix[i][j] == 4) {
                fill("brown");
            }
            rect(j * side, i * side, side, side);
        }
    }
}