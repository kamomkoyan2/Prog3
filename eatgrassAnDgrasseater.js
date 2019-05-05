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

