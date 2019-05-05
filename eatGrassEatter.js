class Eatgrasseater extends LivingCreature  {
    constructor(x, y) {
       super(x,y)
        this.energy = 0;
     
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
       
        return super.getDirections(t);
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
