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
