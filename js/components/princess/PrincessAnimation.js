var PrincessAnimation = function() {
    this.noOfHelp = 0;
    this.frameHelp = 1;
    this.counter = 10;

    this.noOfGiveHeart = 0;
    this.frameGiveHeart = 1;
    this.posX = 2;
    this.posY = 2;
};

PrincessAnimation.prototype.help = function() {
    var frames = [];
    this.noOfHelp += 1;

    if(this.noOfHelp  >= this.counter) {
        this.frameHelp += 1;
        frames = PrincessStores.spriteFrames.help;

        if(this.frameHelp  >= frames.length) {
            this.frameHelp = 0;
        }
        this.posX = frames[this.frameHelp].x;
        this.posY = frames[this.frameHelp].y;
        this.width = frames[this.frameHelp].width;
        this.height = frames[this.frameHelp].height;
        this.noOfHelp = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};

};

PrincessAnimation.prototype.heartBreak = function() {
    var frames = PrincessStores.spriteFrames.heartbreak;
    this.posX = frames[0].x;
    this.posY = frames[0].y;
    this.width = frames[0].width;
    this.height = frames[0].height;

    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};

};

PrincessAnimation.prototype.giveHeart = function(direction) {
    var frames = [];
    this.noOfGiveHeart += 1;

    if(this.noOfGiveHeart  >= this.counter) {
        this.frameGiveHeart += 1;
        if(direction === 'left') {
            frames = PrincessStores.spriteFrames.giveHeart.left;
        }else {
            frames = PrincessStores.spriteFrames.giveHeart.right;
        }


        if(this.frameGiveHeart  >= frames.length) {
            this.frameGiveHeart = 0;
        }
        this.posX = frames[this.frameGiveHeart].x;
        this.posY = frames[this.frameGiveHeart].y;
        this.width = frames[this.frameGiveHeart].width;
        this.height = frames[this.frameGiveHeart].height;
        this.noOfGiveHeart = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};

};


