var Enemy = function(type, currentLevel) {
    this.currentLevel = currentLevel;
    this.type = type;
    this.speed = 0.5;
    this.ctx = GameStores.getCanvasContext();
    this.animation;
    this.animPosX;
    this.animposY;
    this.animWidth;
    this.animHeight;
    this.animation;
    this.init();
};


Enemy.prototype.init = function() {
    var _this = this;
    var startPoint = this.setStartPoint();
    if(startPoint !== null) {
        this.pos = {
            x: startPoint.x,
            y: startPoint.y
        };

        this.EnemyImg = new Image();
        this.EnemyImg.onload = function() {
            GameStores.getCanvasContext().drawImage(this, _this.pos.x, _this.pos.y , 0, 0);
        };
        this.EnemyImg.src = './images/enemy.png';


        this.animation = new EnemyAnimation();
        this.updateDirection();

    }else {
        this.init();
    }
};


Enemy.prototype.setStartPoint = function() {
    var randomPosition = (Math.ceil(Math.random()*2) === 1)? "left": "right",
        topFloor  = FloorStores.getFloorsMap()[this.currentLevel].floorMap,
        randomX = 0;

    if(randomPosition === "left") {
        randomX = Math.ceil(Math.random()* (8 - 3)) + 3;
    }else {
        randomX = Math.ceil(Math.random()* (18 - 11)) + 11;
    }

    var tile = topFloor[randomX];
    if(tile.type  === "block") {
        console.log("not a hole x:", tile.x , 'y:', tile.y);
        return {x:tile.x , y: tile.y};
    }else {
        console.log("Enemy is places on a hole");
        return null;
    }
};



Enemy.prototype.move = function() {
    var moving = Actions.move(this.pos.x, this.pos.y, EnemyStores.width, EnemyStores.height , this.direction , this.speed, false);
    this.pos.x = moving.x;
    this.pos.y = moving.y;
    this.isReset = moving.isReset;
};

Enemy.prototype.updateDirection = function() {
    this.direction = (Math.ceil(Math.random()*2) === 1)? "left": "right";
};

Enemy.prototype.collideHole = function() {
    return Actions.collideHole(this.pos.x, this.pos.y, EnemyStores.width, EnemyStores.height, this.currentLevel, EnemyStores.width);
};


Enemy.prototype.draw = function() {
    if(this.collideHole()) {
        if(this.direction === "left") {
            this.direction = "right";
        }else {
            this.direction = "left";
        }
    }
 
    this.animation.walk(this.type, this.direction);
    this.move();

    /*if(!PlayerStores.isDie && !PlayerStores.isWin) {
        if(this.collideHole()) {
            this.isFall = true;
        }

        if(this.collideLadder()) {
            if(this.isAllowClimb) {
                this.isFall = (Math.ceil(Math.random()*2) === 1)? true: false;
            }
        }

        if(!this.isFall) {
            this.move();
            this.animation = this.bucketAnimation.rotate();
            this.isAllowClimb = true;
        }else {
            this.fall();
            this.animation = this.bucketAnimation.fall();
            this.isAllowClimb = false;
        }

        if(!this.isFall) {
            var updateLevel = this.updateFloorLevel();
            this.currentLevel = updateLevel;
        }
    }

    if(this.animation) {
        this.animPosX = this.animation.posX;
        this.animposY = this.animation.posY;
        this.animWidth = this.animation.width;
        this.animHeight = this.animation.height;
        this.ctx.beginPath();
        this.ctx.drawImage(this.bucketImg, this.animPosX, this.animposY , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight - 1);
    }*/
    this.animPosX = this.animation.posX;
    this.animposY = this.animation.posY;
    this.animWidth = this.animation.width;
    this.animHeight = this.animation.height;
    this.ctx.beginPath();
    this.ctx.drawImage(this.EnemyImg, this.animPosX, this.animposY , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight - 1);

};

Enemy.prototype.updateFloorLevel = function() {
    var i,
        posY = this.pos.y,
        levels = FloorStores.getLevels();

    for (i = 0; i < levels.length; i++) {
        var levelPosY = levels[i].posY;
        var nextLevelPosY;

        if (i === 0) {
            if (posY > levelPosY) {
                return i;
            }
        }

        if (i < levels.length - 1) {
            nextLevelPosY = levels[i + 1].posY;
            if (posY <= levelPosY && posY > nextLevelPosY) {
                return i;
            }
        } else {
            return levels.length - 1;
        }
    }
};

Enemy.prototype.reset = function() {
    this.currentLevel = 5;
    this.isFall = false;
    this.isAllowClimb = false;

    this.init();
};

