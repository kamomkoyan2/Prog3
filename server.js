
// var express = require('express');
// var app = express();
// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
//  var fs = require("fs");

var Grass = require("./grass");
var Bomb = require("./Bomb");
var Eatgrass = require("./eatgrass");
var Eatgrasseater = require("./eatGrassEatter");
var eatgrassAndgrasseater = require("./eatgrassAnDgrasseater");


// var socket = require('socket.io-client')('http://localhost');
// socket.on('connect', function(){});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){});




var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(2000);
var fs = require("fs");

xotArr = []; //խոտերի զանգված
eatArr = []; //խոտակերների զանգված
eatGrassEater = []; //Գիշատիչների Զանգված
eatGrassAndGrassEatter = []; // Խոտակերների և Գիշատիչների Ուտող Զանգվածը
rumb = [];  // 
// Մատրիցի ստեղծում
rows = 20; // Տողերի քանակ
columns = 20; // Սյուների քանակ

matrix = [
    [0, 1, 2, 3, 4, 0, 4, 0, 1, 0, 0, 3, 1, 1, 1, 1, 1],
    [0, 1, 1, 0, 3, 2, 0, 4, 1, 0, 0, 1, 1, 1, 1, 2, 3],
    [0, 1, 5, 0, 2, 1, 0, 0, 1, 5, 1, 3, 1, 2, 1, 1, 1],
    [0, 1, 2, 3, 0, 1, 3, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1],
    [0, 1, 0, 0, 5, 1, 3, 0, 1, 5, 0, 1, 1, 2, 1, 1, 1],
    [0, 1, 0, 0, 0, 1, 0, 3, 1, 4, 2, 3, 1, 1, 1, 2, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 2, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 3, 0, 1, 1, 4, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1, 3, 1, 1, 1, 1],
    [2, 0, 0, 3, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2, 1, 1, 1, 4, 4, 5],
    [1, 1, 1, 1, 0, 1, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1],
    ];
//let random = require('./random');


// let random_matrix = require('./random_matrix')

// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// var messages = [];

// app.use(express.static("."));
// app.get('/', function (req, res) {
//     res.redirect('index.html');
// });
// server.listen(3000);



function create() {


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
create()
obj = {
    matrix: matrix,
    season: "winter"

}
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
    io.sockets.emit("ugharkum em matrix nkari", obj);
}

setInterval(Game, 1000);

var statistics ={ };


setInterval(function(){
    statistics.Grass =xotArr.length;
    statistics.grass = xotArr.length;
    statistics.eatgrass = eatArr.length;
    statistics.Eatgrasseater = eatGrassEater.length;
    statistics.eatgrassAnDgrasseater = eatGrassAndGrassEatter.length;
    statistics.Bomb = Bomb.length;
    fs.writeFile("Statistics.json", JSON.stringify(statistics),function(){
        console.log("send");
    })
},100)