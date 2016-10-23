var Enemy = function(type, currentLevel) {
    this.currentLevel = currentLevel;
    // this.currentLevel = 0; //change later
    this.type = type;
    this.speed = 0.5;
    this.ctx = GameStores.getCanvasContext();
    this.animation;
    this.animPosX;
    this.animposY;
    this.animWidth;
    this.animHeight;
    this.animation;
    this.isAlive;
    this.isDetectClimb;
    this.currentClimbTimer;
    this.isRandomClimb;
    this.resetClimbTimer = 300;
    this.isClimbing;
    this.init();
};


Enemy.prototype.init = function() {
    var _this = this;
    this.isAlive = true;
    this.isDetectClimb = true;
    this.isClimbing = false;
    this.currentClimbTimer = 0;
    this.isRandomClimb = true;
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
        if(this.currentLevel === 0) {
            randomX = Math.ceil(Math.random()* (5 - 2)) + 2;
        }else {
            randomX = Math.ceil(Math.random()* (8 - 3)) + 3;
        }
    }else {
        if(this.currentLevel === 0) {
            randomX = Math.ceil(Math.random()* (18 - 14)) + 14;
        }else {
            randomX = Math.ceil(Math.random()* (18 - 11)) + 11;
        }
    }

    var tile = topFloor[randomX];
    var nextTile = topFloor[randomX + 1];
    //make sure the tile and nextTile are block before put enemy
    if(tile.type  === "block" && nextTile.type === "block") {
        // console.log("not a hole x:", tile.x , 'y:', tile.y);
        return {x:tile.x , y: tile.y};
    }else {
        // console.log("Enemy is places on a hole");
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

Enemy.prototype.collideLadder = function() {
    var offset = {
        minX:0,
        maxX:0
    };

    this.climbDirection = (Math.ceil(Math.random()*2) === 1)? "top": "down";
    return Actions.enemyCollideLadder(this.pos.x, this.pos.y, EnemyStores.width, EnemyStores.height , this.currentLevel, this.climbDirection , offset);

};

Enemy.prototype.startClimb = function(direction, ladder) {
    var climbPos =  Actions.climb(this.pos.x, this.pos.y, EnemyStores.width, EnemyStores.height, direction,this.currentLevel,ladder);
    this.pos.x = climbPos.x;
    this.pos.y = climbPos.y;
    this.isFinishClimb = climbPos.isFinishClimb;
    if(this.isFinishClimb) {
        this.direction =  (Math.ceil(Math.random()*2) === 1)? "left": "right";
        this.isDetectClimb = false;
        this.isClimbing = false;
    }
};

Enemy.prototype.draw = function() {
    if(!PlayerStores.isDie && !PlayerStores.isWin) {
        if (this.collideHole()) {
            if (this.direction === "left") {
                this.direction = "right";
            } else {
                this.direction = "left";
            }
        }

        var myCollideLadder = this.collideLadder();
        if(this.isDetectClimb) {
            if(this.isRandomClimb) { //randomize the change of going down/up
                if( (Math.ceil(Math.random()*2) === 1)) {
                    this.isDetectClimb = false;
                    this.isClimbing = false;
                    this.isFinishClimb = true;
                    return;
                }
                this.isRandomClimb = false;
            }
            if (myCollideLadder.isClimb === "up") {
                this.isClimbing = true;
                this.startClimb("up", myCollideLadder.ladder);
            } else if(myCollideLadder.isClimb === "down") {
                this.isClimbing = true;
                this.startClimb("down", myCollideLadder.ladder);

            }
        }

        if(this.isFinishClimb) {
            this.currentClimbTimer += 1;
            if(this.currentClimbTimer >= this.resetClimbTimer) {
                this.isDetectClimb = true;
                this.isRandomClimb = true;
                this.currentClimbTimer = 0;
            }
        }

        if(this.pos.x <= 0) {
            this.direction = "right";
        }

        if(this.pos.x >= GameStores.sceneWidth - EnemyStores.width) {
            this.direction = "left";
        }

        this.animation.walk(this.type, this.direction);
        this.move();

        if (!this.isClimbing) {
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
        this.ctx.drawImage(this.EnemyImg, this.animPosX, this.animposY , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight - 1);
    }
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
    this.currentLevel = Math.floor(Math.random()* 6);
    this.currentClimbTimer = 0;
    this.init();
};


