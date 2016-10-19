var Bucket = function() {
    this.currentLevel = 5;
    this.speed = 1;
    this.radius = 12;
    this.isFall = false;
    this.isAllowClimb = false;
    this.ctx = GameStores.getCanvasContext();
    this.init();
};


Bucket.prototype.init = function() {
    var startPoint = this.setStartPoint();
    this.direction = (Math.ceil(Math.random()*2) === 1)? "left": "right";
    this.pos = {
        x: startPoint.x,
        y: startPoint.y
    };
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
    var moving = Actions.move(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2 , this.direction , this.speed);
    this.pos.x = moving.x;
    this.pos.y = moving.y;
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
        this.isAllowClimb = true;
    }else {
        this.fall();
        this.isAllowClimb = false;
    }

    if(!this.isFall) {
        var updateLevel = this.updateFloorLevel();
        this.currentLevel = updateLevel;
    }

    this.ctx.beginPath();
    this.ctx.arc(this.pos.x + this.radius,this.pos.y - this.radius,this.radius,0,Math.PI*2,true); // Outer circle
    this.ctx.fill();
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