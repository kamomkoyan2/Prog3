var Xotaker=require("./eatgrass");
var gishatich = require('./eatGrassEatter.js')
module.exports=class Boom {
    constructor(x, y, radiation) {
        this.x = x;
        this.y = y;
        this.radiation = radiation;
        this.directions = [];
    }
    getStrongDirections() {
        this.directions = [
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x + 3, this.y],
            [this.x + 4, this.y],
            [this.x + 4, this.y + 1],
            [this.x + 4, this.y + 2],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 3, this.y],
            [this.x - 4, this.y],
            [this.x - 4, this.y - 1],
            [this.x - 4, this.y - 2],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x, this.y + 4],
            [this.x - 1, this.y + 4],
            [this.x - 2, this.y + 4],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x, this.y - 4],
            [this.x + 1, this.y - 4],
            [this.x + 2, this.y - 4],
        ]
    }
    getMediumDirections() {
        this.directions = [
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x + 3, this.y],
            [this.x + 3, this.y + 1],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 3, this.y],
            [this.x - 3, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
        ]
    }
    getSlowDirections() {
        this.directions = [
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x - 1, this.y],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
            [this.x, this.y + 1],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y - 1],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
        ]
    }
    kill() {

        if (this.radiation == 0) {
            this.getSlowDirections()

        }
        else if (this.radiation == 1) {
            this.getMediumDirections()

        }
        else if (this.radiation == 2) {
            this.getStrongDirections()

        }
        for (var i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
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
                    for (var l in  eatArr) {
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
                matrix[y][x] = 6;
            }
        }
        //matrix[this.y][this.x]=0;
        var x = Math.floor(Math.random()*matrix[0].length)
        var y = Math.floor(Math.random()*matrix.length)
        var radiation=Math.floor(Math.random()*3)
        this.radiation=radiation;
        this.x=x;
        this.y=y;
        matrix[this.y][this.x]=6;
    }
}
