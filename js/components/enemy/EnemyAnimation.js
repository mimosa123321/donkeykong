var EnemyAnimation = function() {
    this.noOfWalk = 0;
    this.frameWalk = 1;
    this.counter = 10;
};


EnemyAnimation.prototype.throw = function(direction) {
    var frames = [];
    this.noOfWalk += 1;

    if(this.noOfWalk  >= this.counter) {
        this.frameWalk += 1;
        if(direction === 'left') {
            frames = DonkeyStores.spriteFrames.throw.left;
        }else {
            frames = DonkeyStores.spriteFrames.throw.right;
        }


        if(this.frameWalk  >= frames.length) {
            this.frameWalk = 0;
        }
        this.posX = frames[this.frameThrow].x;
        this.posY = frames[this.frameThrow].y;
        this.width = frames[this.frameThrow].width;
        this.height = frames[this.frameThrow].height;
        this.noOfWalk = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};

};

