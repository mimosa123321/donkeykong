var AnimalBase = function(_store) {
    this.stepDistance = _store.stepDistance;
    this.jumpDistance = _store.jumpDistance;
    this.store = _store;
};

AnimalBase.prototype.move = function(direction) {
    var posX = 0, posY = 0;
    switch (direction) {
        case 'left':
            if(this.isJump || this.isClimb || this.isFall || this.isBeat) {
                return;
            };
            posX = this.pos.x - this.stepDistance;
            posY = this.pos.y;
            if(posX < 0) {
                posX = 0;
            }

            this.pos.x = posX;
            this.pos.y = posY;
            break;

        case 'right':
            if(this.isJump || this.isClimb || this.isFall || this.isBeat) {
                return;
            };
            posX = this.pos.x + this.stepDistance;
            posY = this.pos.y;
            if(posX > GameStores.sceneWidth - this.store.bodyWidth) {
                posX = GameStores.sceneWidth - this.store.bodyWidth;
            }

            this.pos.x = posX;
            this.pos.y = posY;
            // this.store.setPositions(posX, posY);
            break;

        default:
            break;
    }
    this.lastDirection = direction;
};

//---------------------jump-------------------------
AnimalBase.prototype.startJump = function() {
    if(this.isJump || this.isClimb || this.isFall || this.isBeat) {
        return;
    }
    this.startJumpY = this.pos.y;
    this.destJumpY = this.startJumpY - this.jumpDistance;
    this.speed = 1;
    this.isJump = true;
    SoundManager.play(SoundManager.SOUND_JUMP);
};

AnimalBase.prototype.jump = function() {
    if(this.isFall) {
        return;
    }
    var posX = this.pos.x,
        posY = this.pos.y;

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

        this.pos.x = posX;
        this.pos.y = posY;
        // this.store.setPositions(posX, posY);
        this.isJump = false;
        return;
    }

    posY -= this.speed;
    this.pos.x = posX;
    this.pos.y = posY;
    // this.store.setPositions(posX, posY);
};

//-------------------climb----------------------------
AnimalBase.prototype.climb = function(direction) {
    var i,
        posX = this.pos.x,
        posY = this.pos.y,
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
        var ladder = ladders[i],
            offset = 0;

        if(PlayerStores.getHammer) {
            offset = 15;
        }

        //check collision with ladder
        if(posX + offset> ladder.x   && centerX < ladder.x + FloorStores.ladderWidth) {
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

            this.pos.x = ladder.x + 8;
            this.pos.y = posY;
        }
    }
};

AnimalBase.prototype.collideFloor = function() {
    var i,
        posX = this.pos.x,
        currentLevel = this.store.currentLevel,
        floor = FloorStores.getFloorsMap()[currentLevel].floorMap,
        offset = (PlayerStores.getHammer && this.lastDirection === "right")? 15:0;

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

        if(tileType === "hole" && posX + 10 + offset > tileX && (posX + this.store.bodyWidth * 0.5 + 5 + offset) < tileX + tileWidth) { //if hole, fall
            this.isFall = true;
        }
    }
};

AnimalBase.prototype.fall = function() {
    var posX = this.pos.x,
        posY = this.pos.y;
        posY += 2;

    if(posY + this.store.bodyHeight >= this.destFallY) {
        posY = this.destFallY - this.store.bodyHeight;
        this.isFall = false;
    }
    this.pos.x = posX;
    this.pos.y = posY;
    // this.store.setPositions(posX, posY);
};

AnimalBase.prototype.updateFloorLevel = function() {
    var i,
        posY = this.pos.y + this.store.bodyHeight,
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



