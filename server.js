
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
 var fs = require("fs");

var Grass = require("./grass");
var Bomb = require("./Bomb");
var Eatgrass = require("./eatgrass");
var Eatgrasseater = require("./eatGrassEatter");
var eatgrassAndgrasseater = require("./eatgrassAnDgrasseater");


var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){});
socket.on('event', function(data){});
socket.on('disconnect', function(){});




app.use(express.static("public"));
app.get('/', function (req, res) {
    res.redirect('index.html')
});
server.listen(3000);
var fs = require("fs");

let side = 10;
xotArr = []; //խոտերի զանգված
eatArr = []; //խոտակերների զանգված
eatGrassEater = []; //Գիշատիչների Զանգված
eatGrassAndGrassEatter = []; // Խոտակերների և Գիշատիչների Ուտող Զանգվածը
rumb = [];  // 
matrix = []; // Մատրիցի ստեղծում
rows = 70; // Տողերի քանակ
columns = 70; // Սյուների քանակ

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

// let random_matrix = require('./random_matrix')
function matrixGenerator(matrixSize, grass, eatgrass, eatGrassEater, eatGrassAndGrassEatter, rumb) {
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

}
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var messages = [];

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);



function create() {

}
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

create()

function Game() {
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
    io.sockets.emit("ugharkum em matrix nkari", matrix);
}
setInterval(Game, 10);