var Enemy = function() {
    this.currentLevel = 5;
    this.speed = 1;
    this.radius = 12;
    this.isFall = false;
    this.isAllowClimb = false;
    this.ctx = GameStores.getCanvasContext();
    this.bucketAnimation;
    this.animPosX;
    this.animposY;
    this.animWidth;
    this.animHeight;
    this.animation;
    this.init();
};


Bucket.prototype.init = function() {
    this.bucketAnimation = new BucketAnimation();

    var _this = this;
    // var startPoint = this.setStartPoint();
    // this.direction = (Math.ceil(Math.random()*2) === 1)? "left": "right";
    this.direction = DonkeyStores.throwDirection;
    this.pos = {
        x: DonkeyStores.pos.x,
        y: DonkeyStores.pos.y
    };


    this.bucketImg = new Image();
    this.bucketImg.onload = function() {
        GameStores.getCanvasContext().drawImage(this, _this.pos.x, _this.pos.y , 0, 0);
    };
    this.bucketImg.src = './images/barrelss.png';

    /*this.pos = {
     x: startPoint.x,
     y: 610
     };*/
};

Bucket.prototype.setStartPoint = function() {
    var topFloor  = FloorStores.getFloorsMap()[this.currentLevel].floorMap;
    for(var i=0; i<topFloor.length; i++) {
        var tile = topFloor[i];
        if(tile.type  === "block") {
            return {x: tile.x, y: tile.y}
        }
    }
};

Bucket.prototype.move = function() {
    var moving = Actions.move(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2 , this.direction , this.speed, true);
    this.pos.x = moving.x;
    this.pos.y = moving.y;
    this.isReset = moving.isReset;
};

Bucket.prototype.updateDirection = function() {
    this.direction = (Math.ceil(Math.random()*2) === 1)? "left": "right";
};

Bucket.prototype.collideHole = function() {
    return Actions.collideHole(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2, this.currentLevel);
};

Bucket.prototype.fall = function() {
    var falling = Actions.fall(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2 , this.currentLevel, 2);
    this.pos.x = falling.x;
    this.pos.y = falling.y;

    if(falling.stop === true) {
        this.updateDirection();
        this.isFall = false;
    }
};

Bucket.prototype.collideLadder = function() {
    var offset = {
        minX:4,
        maxX:0
    };
    return Actions.collideLadder(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2 , this.currentLevel, 'down', offset);
};

Bucket.prototype.draw = function() {

    if(!PlayerStores.isDie && !PlayerStores.isWin) {
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
    }
    // this.ctx.arc(this.pos.x + this.radius ,this.pos.y - this.radius - 2,this.radius,0,Math.PI*2,true); // Outer circle
    // this.ctx.fillStyle = "#f4702c";
    // this.ctx.fill();

};

Bucket.prototype.updateFloorLevel = function() {
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

Bucket.prototype.reset = function() {
    this.currentLevel = 5;
    this.isFall = false;
    this.isAllowClimb = false;

    this.init();
};

