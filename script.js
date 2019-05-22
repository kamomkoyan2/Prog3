var side = 25;
socket = io();
var socket = io();
socket.on("nkari matrix",drawmatrix)
var matrix = [];





function setup() {

    frameRate(5);
    createCanvas(40 * side, 40 * side);
    background('#acacac');



}


function matrixDraw (matrix){

    // matrix = data.matrix;

    // createCanvas(matrix[0].length * side, matrix.length * side)

    

    // background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");

            } else if (matrix[i][j] == 2) {
                fill("orange");

            } else if (matrix[i][j] == 0) {
                if(exanak=="Գարուն") {
                    fill(0,255,0)
                }
                // fill('#acacac');
                else if(exanak=="Ամառ"){
                    fill(0,155,0)
                }
                else if(exanak=="Աշուն"){
                    fill(0,75,0)
                }
                else if(exanak=="Ձմեռ"){
                    fill("white")
                }
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



    for (var i in xotArr) {
        xotArr[i].mul();
    }


    for (var i in eatArr) {
        eatArr[i].eat();
    }


    for (var i in eatGrassEater) {
        eatGrassEater[i].eat();
    }


    for (var i in eatGrassAndGrassEatter) {
        eatGrassAndGrassEatter[i].eat();
    }


    for (var i in rumb) {
        rumb[i].die();
        rumb[i].selfkill()

    }
  
}



