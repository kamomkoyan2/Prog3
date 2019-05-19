var side = 25;
var socket = io();
var matrix = [];

exanak = "Ձմեռ";
var weatherP = document.getElementById("weather")

var ex = socket.on("exanaks", function (w) {
    exanak = w;
    weatherP.innerHTML = exanak;
});

socket.on('number', function (len) {
    let grass = document.getElementById('grNum');
    let grEater = document.getElementById('grEaNum')
    let hunter = document.getElementById('hun')
    grass.innerHTML = len[0];
    grEater.innerHTML = len[1];
    hunter.innerHTML = len[2]
})

socket.on('statistics', function (stat) {
    let table = document.getElementById('table_statistics');
    table.rows[2].cells[2].innerHTML = stat.died.grassEaters;
    table.rows[2].cells[3].innerHTML = stat.died.hunters;
    table.rows[3].cells[1].innerHTML = stat.killed.grasses;
    table.rows[3].cells[2].innerHTML = stat.killed.grassEaters;
    table.rows[4].cells[1].innerHTML = stat.born.grasses;
    table.rows[4].cells[2].innerHTML = stat.born.grassEaters;
    table.rows[4].cells[3].innerHTML = stat.born.hunters;
    table.rows[5].cells[2].innerHTML = stat.ate.grassEaters;
    table.rows[5].cells[3].innerHTML = stat.ate.hunters;
})



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



