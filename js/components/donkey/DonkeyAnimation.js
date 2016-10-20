var DonkeyAnimation = function() {
    this.noOfBeat = 0;
    this.frameBeat = 1;
    this.counter = 10;
    this.noOfThrow = 0;
    this.frameThrow = 1;
    this.noOfDead = 0;
    this.frameDead = 1;
    this.noOfWin = 0;
    this.frameWin = 1;
    this.posX = 2;
    this.posY = 2;
};

DonkeyAnimation.prototype.beat = function() {
    var frames = [];
    this.noOfBeat += 1;

    if(this.noOfBeat  >= this.counter) {
        this.frameBeat += 1;
        frames = DonkeyStores.spriteFrames.beat;

        if(this.frameBeat  >= frames.length) {
            this.frameBeat = 0;
        }
        this.posX = frames[this.frameBeat].x;
        this.posY = frames[this.frameBeat].y;
        this.width = frames[this.frameBeat].width;
        this.height = frames[this.frameBeat].height;
        this.noOfBeat = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};

};

DonkeyAnimation.prototype.throw = function(direction) {
    var frames = [];
    this.noOfThrow += 1;

    if(this.noOfThrow  >= this.counter) {
        this.frameThrow += 1;
        if(direction === 'left') {
            frames = DonkeyStores.spriteFrames.throw.left;
        }else {
            frames = DonkeyStores.spriteFrames.throw.right;
        }


        if(this.frameThrow  >= frames.length) {
            this.frameThrow = 0;
        }
        this.posX = frames[this.frameThrow].x;
        this.posY = frames[this.frameThrow].y;
        this.width = frames[this.frameThrow].width;
        this.height = frames[this.frameThrow].height;
        this.noOfBeat = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};

};

DonkeyAnimation.prototype.stand = function() {
    var frames = DonkeyStores.spriteFrames.stand;
    this.posX = frames[0].x;
    this.posY = frames[0].y;
    this.width = frames[0].width;
    this.height = frames[0].height;

    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
};

DonkeyAnimation.prototype.win = function() {
    var frames = [];
    this.noOfWin += 1;

    if(this.noOfWin  >= this.counter) {
        this.frameWin += 1;
        frames = DonkeyStores.spriteFrames.win;

        if(this.frameWin  >= frames.length) {
            this.frameWin = 0;
        }
        this.posX = frames[this.frameWin].x;
        this.posY = frames[this.frameWin].y;
        this.width = frames[this.frameWin].width;
        this.height = frames[this.frameWin].height;
        this.noOfWin = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
};

DonkeyAnimation.prototype.dead = function() {
    var frames = [];
    this.noOfDead += 1;

    if(this.noOfDead  >= this.counter) {
        this.frameDead += 1;
        frames = DonkeyStores.spriteFrames.dead;

        if(this.frameDead  >= frames.length) {
            this.frameDead = 0;
        }
        this.posX = frames[this.frameDead].x;
        this.posY = frames[this.frameDead].y;
        this.width = frames[this.frameDead].width;
        this.height = frames[this.frameDead].height;
        this.noOfDead = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
};

