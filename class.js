
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.multiply = 0;
        this.directions = [];

    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
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


    mul() {
        this.multiply++;
        if (this.multiply == 2) {

            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];


                var norXot = new Grass(x, y);
                xotArr.push(norXot);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}


class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 0;
        this.directions = [];
    }


    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
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



    move() {

        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];


            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;
        }
    }



    eat() {

        var fundCords = this.getDirections(1);
        var cord = random(fundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;


            this.multiply++;


            this.energy++;


            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }


            if (this.multiply == 6) {
                this.mul()
                this.multiply = 0;
            }


        } else {

            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }



    mul() {


        var fundCords = this.getDirections(0);
        var cord = random(fundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);


            matrix[y][x] = 2;

        }
    }

    die() {

        matrix[this.y][this.x] = 0;

        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}



class Eatgrasseater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 0;
        this.multiply = 0;
        this.directions = [];
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
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
    move() {
        let foundCords = this.getDirections(0);
        let cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;

            this.energy--;
        }
    }


    eat() {
        let foundCords = this.getDirections(2);
        let cord = random(foundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];


            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;





            this.energy++;


            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }

            if (this.multiply == 4) {
                this.mul()
                this.multiply = 0;
            }

        } else {

            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }

        }
    }


    mul() {
        this.multiply++;



        var fundCords = this.getDirections(0);
        var cord = random(fundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norgishatich = new Eatgrasseater(x, y);
            eatGrassEater.push(norgishatich);


            matrix[y][x] = 3;

        }

    }

    die() {

        matrix[this.y][this.x] = 0;


        for (var i in eatGrassEater) {
            if (this.x == eatGrassEater[i].x && this.y == eatGrassEater[i].y) {
                eatGrassEater.splice(i, 1);
            }
        }
    }
}


class eatgrassAndgrasseater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 0;
        this.directions = [];
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
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

    move() {
        let foundCords = this.getDirections(0);
        //let foundCords2 = this.getDirections(1);
        //let foundCords = foundCords1.concat(foundCords2);
        let cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;
        }
    }

    mul() {
        this.multiply++;

        let foundCords = this.getDirections(0);

        let cord = random(foundCords);


        if (cord) {
            var x = cord[0];
            var y = cord[1];

            let norKerpar = new eatgrassAndgrasseater(x, y);
            eatGrassAndGrassEatter.push(norKerpar);

            matrix[y][x] == 4;
        }


    }

    eat() {
        let foundCords1 = this.getDirections(3);
        let foundCords2 = this.getDirections(2);
        let foundCords = foundCords1.concat(foundCords2);
        let cord = random(foundCords);



        if (cord) {
            var x = cord[0];
            var y = cord[1];

            let c = matrix[y][x]
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;


            this.x = x;
            this.y = y;


            this.multiply++;


            this.energy++;

            if (c == 2) {

                for (var i in eatArr) {
                    if (x == eatArr[i].x && y == eatArr[i].y) {
                        eatArr.splice(i, 1);
                    }
                }
            }
            else if (c == 3) {
                for (var i in eatGrassEater) {
                    if (x == eatGrassEater[i].x && y == eatGrassEater[i].y) {
                        eatGrassEater.splice(i, 1)
                    }
                }
            }



            if (this.multiply == 6) {
                this.mul()
                this.multiply = 0;
            }

        } else {

            this.move();
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }

        }
    }


    die() {

        matrix[this.y][this.x] = 0;


        for (var i in eatGrassAndGrassEatter) {
            if (this.x == eatGrassAndGrassEatter[i].x && this.y == eatGrassAndGrassEatter[i].y) {
                eatGrassAndGrassEatter.splice(i, 1);
            }
        }
    }
}



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
