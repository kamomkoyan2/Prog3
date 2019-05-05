let side = 10;
let xotArr = []; //խոտերի զանգված
let eatArr = []; //խոտակերների զանգված
let eatGrassEater = []; //Գիշատիչների Զանգված
let eatGrassAndGrassEatter = []; // Խոտակերների և Գիշատիչների Ուտող Զանգվածը
let rumb = [];  // 
let matrix = []; // Մատրիցի ստեղծում
let rows = 70; // Տողերի քանակ
let columns = 70; // Սյուների քանակ

for (let y = 0; y < rows; y++) {
    matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
        }
        if (a >= 20 && a < 40) {
            matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
        }
        else if (a >= 40 && a < 80) {
            matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
        }
        else if (a >= 70 && a < 80) {
            matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
        }
        else if (a >= 70 && a < 97) {
            matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
        }
        else if (a >= 98 && a < 100) {
            matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
        }
    }
}

function setup() {

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var etg = new Eatgrasseater(x, y);
                eatGrassEater.push(etg);
            }
            else if (matrix[y][x] == 4) {
                var eget = new eatgrassAndgrasseater(x, y);
                eatGrassAndGrassEatter.push(eget);
            }
            else if (matrix[y][x] == 5) {
                var rum = new Bomb;
                rumb.push(rum);
            }

        }
    }
}


function draw() {
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



