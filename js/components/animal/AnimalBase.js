var AnimalBase = function(_store) {
    this.stepDistance = _store.stepDistance;
    this.jumpDistance = _store.jumpDistance;
    this.store = _store;
    this.direction = null;
    this.startJumpY;
    this.destJumpY;
    this.destFallY;
    this.isJump = false;
    this.isClimb = false;
    this.isFall = false;

    this.lastDirection = 'right';
};

AnimalBase.prototype.move = function(direction) {
    var posX = 0, posY = 0;
    switch (direction) {
        case 'left':
            if(this.isJump || this.isClimb || this.isFall) {
                return;
            };
            posX = this.store.getPositions().x - this.stepDistance;
            posY = this.store.getPositions().y;
            if(posX < 0) {
                posX = 0;
            }
            
            this.store.setPositions(posX, posY);
            break;

        case 'right':
            if(this.isJump || this.isClimb || this.isFall) {
                return;
            };
            posX = this.store.getPositions().x + this.stepDistance;
            posY = this.store.getPositions().y;
            if(posX > GameStores.sceneWidth - this.store.bodyWidth) {
                posX = GameStores.sceneWidth - this.store.bodyWidth;
            }
            this.store.setPositions(posX, posY);
            break;

        default:
            break;
    }
    this.lastDirection = direction;
};

//---------------------jump-------------------------
AnimalBase.prototype.startJump = function() {
    if(this.isJump || this.isClimb || this.isFall) {
        return;
    }
    this.startJumpY = this.store.getPositions().y;
    this.destJumpY = this.startJumpY - this.jumpDistance;
    this.speed = 1;
    this.isJump = true;
};

AnimalBase.prototype.jump = function() {
    if(this.isFall) {
        return;
    }
    var posX = this.store.getPositions().x,
        posY = this.store.getPositions().y;

    if(this.direction === 'left') {
        posX -= 1.5;
    }else if(this.direction === 'right') {
        posX += 1.5;
    }

    if(posX > GameStores.sceneWidth - this.store.bodyWidth) {
        posX = GameStores.sceneWidth - this.store.bodyWidth;
    }else if(posX < 0) {
        posX = 0;
    }

    if( posY < this.destJumpY) {
        this.speed *= -1;
    }else if( posY > this.startJumpY) {
        posY = this.startJumpY;
        this.store.setPositions(posX, posY);
        this.isJump = false;
        return;
    }

    posY -= this.speed;
    this.store.setPositions(posX, posY);
};

//-------------------climb----------------------------
AnimalBase.prototype.climb = function(direction) {
    var i,
        posX = this.store.getPositions().x,
        posY = this.store.getPositions().y,
        centerX = posX + (this.store.bodyWidth * 0.5),
        currentLevel = this.store.currentLevel,
        destY,
        ladders = FloorStores.getLadderMap()[currentLevel];

    switch (direction) {
        case "up":
            if(currentLevel === FloorStores.totalFloor - 1) { //can't climb up when it's on the most top level
                return;
            }
            destY = FloorStores.getLevels()[currentLevel + 1].posY; //destY is at one top level
            ladders = FloorStores.getLadderMap()[currentLevel];  //ladders position at current level
            break;

        case "down":
            if(this.isClimb) { //if climbing the ladder, ladders position and destY are at the current levels
                ladders = FloorStores.getLadderMap()[currentLevel];
                destY = FloorStores.getLevels()[currentLevel].posY;
            }else { //if not climbing, ladders and destY are at one down level
                if(currentLevel === 0) { //if level 0, no down level
                    return;
                }
                ladders = FloorStores.getLadderMap()[currentLevel - 1];
                destY = FloorStores.getLevels()[currentLevel - 1].posY;
            }
            break;

        default:
            break;
    }

    for(i=0; i<ladders.length; i++) {
        var ladder = ladders[i];

        //check collision with ladder
        if(posX > ladder.x - 5  && centerX < ladder.x + FloorStores.ladderWidth) {
            this.isClimb = true; //start climb
            switch (direction) {
                case "up":
                    posY -= 4;
                    if(posY + this.store.bodyHeight <= destY ) { //if reach the destination, climb is not allowed
                        posY = destY - this.store.bodyHeight;
                        this.isClimb = false;
                    }
                    break;

                case "down":
                    posY += 4;
                    if(posY + this.store.bodyHeight >= destY ) {
                        posY = destY - this.store.bodyHeight;
                        this.isClimb = false;
                    }
                    break;

                default:
                    break;
            }

            this.store.setPositions(posX, posY);
        }
    }
};

AnimalBase.prototype.collideFloor = function() {
    var i,
        posX = this.store.getPositions().x,
        currentLevel = this.store.currentLevel,
        floor = FloorStores.getFloorsMap()[currentLevel].floorMap;

    if(currentLevel === 0) {
        return;
    }else {
        //set the destination Y of fall is the y of below level
        this.destFallY = FloorStores.getLevels()[currentLevel - 1].posY;
    }

    for(i=0; i<floor.length; i++) {
        var tile = floor[i],
            tileType = tile.type,
            tileX = tile.x,
            tileWidth = FloorStores.tileWidth;

        if(tileType === "hole" && posX + 10 > tileX && (posX + this.store.bodyWidth * 0.5 + 5) < tileX + tileWidth) { //if hole, fall
            this.isFall = true;
        }
    }
};

AnimalBase.prototype.fall = function() {
    var posX = this.store.getPositions().x,
        posY = this.store.getPositions().y;
        posY += 2;

    if(posY + this.store.bodyHeight >= this.destFallY) {
        posY = this.destFallY - this.store.bodyHeight;
        this.isFall = false;
    }
    this.store.setPositions(posX, posY);
};

AnimalBase.prototype.updateFloorLevel = function() {
    var i,
        posY = this.store.getPositions().y + this.store.bodyHeight,
        levels = FloorStores.getLevels();
    for(i=0; i<levels.length; i++) {
        var levelPosY = levels[i].posY;
        var nextLevelPosY;

        if(i===0) {
            if(posY > levelPosY) {
                return i;
            }
        }

        if(i < levels.length - 1) {
            nextLevelPosY = levels[i+1].posY;
            if(posY <= levelPosY && posY > nextLevelPosY) {
                return i;
            }
        }else {
            return levels.length - 1;
        }
    }
};

AnimalBase.prototype.restoreKey = function() {
    this.direction = null;
};



