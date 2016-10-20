var Player = function() {
    this.direction = null;
    this.startJumpY;
    this.destJumpY;
    this.destFallY;
    this.isJump = false;
    this.isClimb = false;
    this.isFall = false;
    this.lastDirection = 'right';

    AnimalBase.call(this, PlayerStores);
    this.setInitialPosition();
    this.init();
};

Player.BODY_WIDTH = PlayerStores.bodyWidth;
Player.BODY_HEIGHT = PlayerStores.bodyHeight;

Player.prototype = Object.create(AnimalBase.prototype);
Player.prototype.constructor = Player;

Player.prototype.setInitialPosition = function() {
    var x = (GameStores.sceneWidth - PlayerStores.bodyWidth) * 0.5,
        y = GameStores.sceneHeight - FloorStores.tileHeight - PlayerStores.bodyHeight;
    this.pos = {
        x: x,
        y: y
    };
};

Player.prototype.init = function() {
    var _this = this;
    this.player = new Image();
    this.player.onload = function() {
        GameStores.getCanvasContext().drawImage(this, _this.pos.x, _this.pos.y, PlayerStores.bodyWidth, PlayerStores.bodyHeight);
    };
    this.player.src = './images/marioss.png';
};

Player.prototype.collideBucket = function() {
    for(var i=0; i<BucketStores.buckets.length; i++) {
        var bucket = BucketStores.buckets[i];

        if(this.pos.x + PlayerStores.bodyWidth - 4 >= bucket.pos.x + 7 && this.pos.x <= bucket.pos.x + bucket.radius  && this.pos.y + PlayerStores.bodyHeight >= bucket.pos.y - bucket.radius  && this.pos.y <= bucket.pos.y) {
            this.die();
            return;
        }
    }
};

Player.prototype.collideDockey = function() {
    if(this.pos.x + PlayerStores.bodyWidth >= DonkeyStores.pos.x && this.pos.x <= DonkeyStores.pos.x + DonkeyStores.width && this.store.currentLevel === 5) {
        this.die();
        return;
    }
};

Player.prototype.collidePrincess = function() {
    if(this.pos.x + PlayerStores.bodyWidth >= PrincessStores.pos.x && this.pos.x <= PrincessStores.pos.x + PrincessStores.width && this.store.currentLevel === 6) {
        this.win();
        return;
    }
};

Player.prototype.die = function() {
    PlayerStores.isDie = true;
};

Player.prototype.win = function() {
    PlayerStores.isWin = true;
};

Player.prototype.draw = function() {
    var posX;
    var posY;
    var width;
    var height;
    var animation;

    if(!PlayerStores.isDie && !PlayerStores.isWin) {
        if(this.direction) {
            animation = PlayerAnimation.walk(this.direction);
            this.move(this.direction);
        }else {
            animation = PlayerAnimation.stand(this.lastDirection);
        }

        if(this.isJump) {
            animation = PlayerAnimation.jump(this.lastDirection);
            this.jump();
        }

        if(this.isClimb) {
            animation = PlayerAnimation.climb();
        }

        if(!this.isJump && !this.isClimb && !this.isFall) {
            this.collideFloor();
        }

        if(this.isFall) {
            this.fall();
        }

        this.collideBucket();
        this.collideDockey();
        this.collidePrincess();

        //update floor level when its state is not jump - have errors when update currentlevel when jump
        if(!this.isJump) {
            this.store.currentLevel =  this.updateFloorLevel();
        }
    }

    if(PlayerStores.isDie) {
        // this.pos.y = FloorStores.getLevels()[this.store.currentLevel].posY - PlayerStores.bodyHeight;
        if(this.pos.y < FloorStores.getLevels()[this.store.currentLevel].posY - PlayerStores.bodyHeight) {
            this.pos.y += 2;
        }
        if(this.pos.y >= FloorStores.getLevels()[this.store.currentLevel].posY - PlayerStores.bodyHeight) {
            this.pos.y = FloorStores.getLevels()[this.store.currentLevel].posY - PlayerStores.bodyHeight;
        }
        animation = PlayerAnimation.die(this.lastDirection);
    }

    if(PlayerStores.isWin) {
        animation = PlayerAnimation.stand(this.lastDirection);
    }

    if(animation) {
        posX = animation.posX;
        posY = animation.posY;
        width = animation.width;
        height = animation.height;

        GameStores.getCanvasContext().drawImage(this.player, posX, posY, width, height, this.pos.x, this.pos.y, width, height);
    }
};


Player.prototype.reset = function() {
    this.direction = null;
    this.startJumpY;
    this.destJumpY;
    this.destFallY;
    this.isJump = false;
    this.isClimb = false;
    this.isFall = false;
    this.lastDirection = 'right';

    this.setInitialPosition();
};



