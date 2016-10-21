var Donkey = function() {
    this.ctx = GameStores.getCanvasContext();
    this.currentLevel = 5;
    this.animation;
    this.isBeat = true;
    this.isStartIntro = false;
    this.currentTime = 0;
    this.introTimer = 100;

    this.currentThrowTimer= 0;
    this.throwTimer= 200;

    this.currentThrowAnimTimer = 0;
    this.throwAnimTimer = 100;

    this.throwDirection = null;
    this.didPlayThrowSound = false;

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

    this.isStartIntro = true;
};

Donkey.prototype.setStartPoint = function() {
    console.log(FloorStores.getLadderMap()[this.currentLevel - 1]);
    var topFloor  = FloorStores.getFloorsMap()[this.currentLevel].floorMap;
    for(var i=8; i<topFloor.length; i++) {
        var tile = topFloor[i];
        var nextTile = topFloor[i + 1];

        if(tile.type  === "block" && nextTile.type === "block") {
            console.log(tile.x);
            for(var j=0; j<FloorStores.getLadderMap()[this.currentLevel - 1].length; j++) {
                var ladder = FloorStores.getLadderMap()[this.currentLevel - 1][j];
                if(tile.x != ladder.x && nextTile.x != ladder.x) {
                    return {x: tile.x, y: tile.y}
                }
            }
        }
    }
};

Donkey.prototype.draw = function() {

    if(!PlayerStores.isDie && !PlayerStores.isWin) {

        if(this.isStartIntro) {
            this.currentTime += 1;

            if(this.currentTime >= this.introTimer) {
                this.isBeat = false;
                this.isStartIntro = false;
            }
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
                if(!this.didPlayThrowSound) {
                    this.didPlayThrowSound = true;
                    SoundManager.play(SoundManager.SOUND_THROW_BARREL);
                }
            }
        }

        if(DonkeyStores.isThrow) {
            this.currentThrowAnimTimer += 1;
            if(this.currentThrowAnimTimer >= this.throwAnimTimer ) {
                DonkeyStores.isThrow = false;
                this.currentThrowAnimTimer = 0;
                this.currentThrowTimer = 0;
                this.throwDirection = null;
                this.didPlayThrowSound = false;
            }
        }

        if(!this.isBeat && !DonkeyStores.isThrow) {
            this.animation.stand();
        }
    }

    if(PlayerStores.isDie) {
        SoundManager.play(SoundManager.SOUND_DONKEY_WIN);
        this.animation.win();
    }

    if(PlayerStores.isWin) {
        this.animation.dead();
    }

    this.animPosX = this.animation.posX;
    this.animposY = this.animation.posY;
    this.animWidth = this.animation.width;
    this.animHeight = this.animation.height;

    this.ctx.beginPath();
    this.ctx.drawImage(this.donkeyImg, this.animPosX, this.animposY , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight - 1);
};


Donkey.prototype.reset = function() {
    var _this = this;

    this.animation;

    this.currentTime = 0;
    this.introTimer = 100;

    this.currentThrowTimer= 0;
    this.throwTimer= 200;

    this.currentThrowAnimTimer = 0;
    this.throwAnimTimer = 100;

    this.throwDirection = null;

    DonkeyStores.isThrow = false;

    this.isBeat = true;

    setTimeout(function(){
        _this.isStartIntro = true;
    }, 1000);

};








