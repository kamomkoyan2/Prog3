var Grass = require("./grass");
var Bomb = require("./Bomb");
var Eatgrass = require("./eatgrass");
var Eatgrasseater = require("./eatGrassEatter");
var eatgrassAndgrasseater = require("./eatgrassAnDgrasseater");
var Boom = require("./Boom");

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

let num = 40;
xotArr = [];
eatArr = [];
eatGrassEater = [];
eatGrassAndGrassEatter = [];
rumb = [];
boom = [];  // 


matrix = [
    [0, 1, 5, 3, 4, 7, 4, 0, 1, 0, 0, 3, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [0, 1, 1, 0, 3, 2, 0, 4, 1, 6, 6, 1, 1, 1, 1, 2, 3, 3, 4, 7, 4, 0, ],
    [0, 1, 5, 0, 2, 1, 3, 5, 1, 5, 1, 3, 3, 2, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [0, 1, 2, 3, 3, 7, 3, 7, 1, 6, 1, 1, 1, 1, 1, 2, 1, 3, 4, 7, 4, 0, ],
    [0, 1, 0, 4, 5, 1, 3, 0, 1, 5, 0, , 1, 2, 1, 1, 1, 3, 4, 7, 4, 0, 1],
    [0, 1, 0, 5, 0, 1, 0, 3, 1, 4, 6, 3, 1, 1, 1, 2, 1, 3, 4, 7, 4, 0, ],
    [0, 0, 1, 2, 3, 1, 0, 5, 1, 0, 0, 1, 1, 2, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [0, 0, 0, 0, 0, 1, 0, 3, 1, 7, 0, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 3, 0, 1, 1, 4, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1, 3, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [2, 0, 0, 3, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [2, 0, 0, 0, 0, 1, 0, 1, 1, 2, 2, 1, 1, 1, 4, 4, 5, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 3, 2, 2, 1, 1, 1, 1, 1, 1, 3, 4, 7, 4, 0, ],
];


var stormChecker = false;


io.on('connection', function (socket) {
    socket.on('pushGrassEaters', function () {
        for (var gr = 0; gr < 5; gr++) {
            var i = Math.floor(Math.random() * matrix[0].length)
            var j = Math.floor(Math.random() * matrix.length)
            if (matrix[j][i] == 0 || matrix[j][i] == 1) {
                matrix[j][i] = 3;
                eatGrassEater.push(new Eatgrasseater(i, j))
            }
        }
    })
    socket.on('stormCall', function () {
        stormChecker = true;
        var randInt = Math.floor(Math.random() * ((num * 2) - 7) + 7);
        var randInt2 = Math.floor(Math.random() * ((num - 7) - (-num + 7)) - num + 7);
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {
                if (y + x == randInt || y + x == randInt - 5 || x == y + randInt2 || x == y + randInt2 - 5) {
                    if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                        if (matrix[y][x] == 1) {
                            for (var l in xotArr) {
                                if (x == xotArr[l].x && y == xotArr[l].y) {
                                    xotArr.splice(l, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 2) {
                            for (var l in eatArr) {
                                if (x == eatArr[l].x && y == eatArr[l].y) {
                                    eatArr.splice(l, 1);
                                    break;
                                }
                            }
                        }
                        else if (matrix[y][x] == 3) {
                            for (var l in eatGrassEater) {
                                if (x == eatGrassEater[l].x && y == eatGrassEater[l].y) {
                                    eatGrassEater.splice(l, 1);
                                    break;
                                }
                            }
                        }
                        matrix[y][x] = 7;
                    }
                }
            }
        }
    })
});



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
            else if (matrix[y][x]== 6) {
                var bom = new Boom;
                boom.push(bom);
            }
            

        }
    }
}
create()
let seasonDate = 0
obj = {
    matrix: matrix,
    season: "winter"

}
function Game() {
    seasonDate++;
    if(seasonDate <= 6)
    {
        obj.season = "winter"
    }
    else if(seasonDate <= 12)
    {
        obj.season = "summer"
    }
    
    else 
    {
        seasonDate = 0;
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
    for (var i in boom){
        boom[i].kill();
    }
   
    io.sockets.emit("ugharkum em matrix nkari", obj);
}

setInterval(Game, 500);

var statistics = { };


setInterval(function () {
    statistics.Grass = xotArr.length;
    statistics.grass = xotArr.length;
    statistics.eatgrass = eatArr.length;
    statistics.Eatgrasseater = eatGrassEater.length;
    statistics.eatgrassAnDgrasseater = eatGrassAndGrassEatter.length;
    statistics.Bomb = Bomb.length;
    statistics.Boom = Boom.length;
    fs.writeFile("Statistics.json", JSON.stringify(statistics), function () {
        console.log("send");
    })
}, 100)