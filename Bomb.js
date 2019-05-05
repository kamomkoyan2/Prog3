class Bomb {
    constructor() {
        this.x = Math.floor(Math.random() * matrix[0].length);
        this.y = Math.floor(Math.random() * matrix.length);
        this.directions = [];
    }


    newDirections() {
        this.directions = [
            [this.x, this.y],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x + 2, this.y],
            [this.x + 2, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x - 2, this.y + 2],
            [this.x - 2, this.y + 1],
            [this.x - 2, this.y],
            [this.x - 2, this.y - 1],
            [this.x - 3, this.y - 3],
            [this.x - 2, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x + 3, this.y - 2],
            [this.x + 3, this.y - 1],
            [this.x + 3, this.y],
            [this.x + 3, this.y + 1],
            [this.x + 3, this.y + 2],
            [this.x + 2, this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x - 2, this.y + 3],
            [this.x - 3, this.y + 3],
            [this.x - 3, this.y + 2],
            [this.x - 3, this.y + 1],
            [this.x - 3, this.y],
            [this.x - 3, this.y - 1],
            [this.x - 3, this.y - 2]
        ];
    }


    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


selfkill(){
    for (var i in rumb) {
        if (this.x == rumb[i].x && this.y == rumb[i].y) {
            rumb.splice(i, 1);
        }
    }
}


    die() {
        

        this.newDirections()
        for (let l in this.directions) {
            let x = this.directions[l][0]
            let y = this.directions[l][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 1) {
                    for (var i in xotArr) {
                        if (x == xotArr[i].x && y == xotArr[i].y) {
                            xotArr.splice(i, 1);
                        }
                    }

                }

                else if (matrix[y][x] == 2) {
                    for (var i in eatArr) {
                        if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                            eatArr.splice(i, 1);
                        }
                    }

                }
                else if (matrix[y][x] == 3) {

                    for (var i in eatGrassEater) {
                        if (x == eatGrassEater[i].x && y == eatGrassEater[i].y) {
                            eatGrassEater.splice(i, 1);
                        }
                    }


                }
                else if (matrix[y][x] == 4) {
                    for (var i in eatGrassAndGrassEatter) {
                        if (x == eatGrassAndGrassEatter[i].x && y == eatGrassAndGrassEatter[i].y) {
                            eatGrassAndGrassEatter.splice(i, 1);
                        }
                    }
                }


                matrix[y][x] = 0;
            }
        }

    }


}
