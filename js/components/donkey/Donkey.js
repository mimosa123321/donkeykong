var Donkey = function() {
    this.ctx = GameStores.getCanvasContext();
    this.currentLevel = 5;
    this.animation;
    this.isBeat = true;
    // this.isThrow = false;
    this.currentTime = 0;
    this.introTimer = 100;

    this.currentThrowTimer= 0;
    this.throwTimer= 200;

    this.currentThrowAnimTimer = 0;
    this.throwAnimTimer = 100;

    this.throwDirection = null;

    this.init();
};

Donkey.prototype.init = function() {
    var _this = this;

    this.animation = new DonkeyAnimation();

    var startPoint = this.setStartPoint();

    //for bucket initial position use
    DonkeyStores.pos.x = startPoint.x;
    DonkeyStores.pos.y = startPoint.y;

    this.pos = {
        x: startPoint.x,
        y: startPoint.y
    };

    this.donkeyImg = new Image();
    this.donkeyImg.onload = function() {
        GameStores.getCanvasContext().drawImage(this, _this.pos.x, _this.pos.y , 0, 0);
    };
    this.donkeyImg.src = './images/donkeyss.png';
};

Donkey.prototype.setStartPoint = function() {
    var topFloor  = FloorStores.getFloorsMap()[this.currentLevel].floorMap;
    for(var i=8; i<topFloor.length; i++) {
        var tile = topFloor[i];
        var nextTile = topFloor[i + 1];

        if(tile.type  === "block" && nextTile.type === "block") {
            return {x: tile.x, y: tile.y}
        }
    }
};

Donkey.prototype.draw = function() {

    if(!PlayerStores.isDie) {
        this.currentTime += 1;

        if(this.currentTime >= this.introTimer) {
            this.isBeat = false;
        }

        if(this.isBeat) {
            this.animation.beat();
        }

        //throw
        if(!this.isBeat) {
            this.currentThrowTimer += 1;
            if(this.currentThrowTimer >= this.throwTimer) {
                if( this.throwDirection === null) {
                    this.throwDirection = (Math.ceil(Math.random()*2) === 1)? "left": "right";
                    DonkeyStores.throwDirection = this.throwDirection;
                }

                DonkeyStores.isThrow = true;
                this.animation.throw(this.throwDirection);
            }
        }

        if(DonkeyStores.isThrow) {
            this.currentThrowAnimTimer += 1;
            if(this.currentThrowAnimTimer >= this.throwAnimTimer ) {
                DonkeyStores.isThrow = false;
                this.currentThrowAnimTimer = 0;
                this.currentThrowTimer = 0;
                this.throwDirection = null;
            }
        }

        if(!this.isBeat && !DonkeyStores.isThrow) {
            this.animation.stand();
        }
    }else {
        // this.animation.dead();
        this.animation.win();
    }



    this.animPosX = this.animation.posX;
    this.animposY = this.animation.posY;
    this.animWidth = this.animation.width;
    this.animHeight = this.animation.height;

    this.ctx.beginPath();
    this.ctx.drawImage(this.donkeyImg, this.animPosX, this.animposY , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight - 1);
};





