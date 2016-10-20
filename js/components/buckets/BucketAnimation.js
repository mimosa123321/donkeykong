var BucketAnimation = function() {
    this.noOfWalk = 0;
    this.frameWalk = 1;
    this.counterWalk = 10;
    this.noOfFall = 0;
    this.frameFall = 1;
    this.posX = 2;
    this.posY = 2;
};

BucketAnimation.prototype.rotate = function() {
    var frames = [];
    this.noOfWalk += 1;

    if(this.noOfWalk  >= this.counterWalk) {
        this.frameWalk += 1;
        frames = BucketStores.spriteFrames.rotate;

        if(this.frameWalk  >= frames.length) {
            this.frameWalk = 0;
        }
        this.posX = frames[this.frameWalk].x;
        this.posY = frames[this.frameWalk].y;
        this.width = frames[this.frameWalk].width;
        this.height = frames[this.frameWalk].height;
        this.noOfWalk = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};

};

BucketAnimation.prototype.fall = function() {
    var frames = [];
    this.noOfFall += 1;

    if(this.noOfFall  >= this.counterWalk) {
        this.frameFall += 1;
        frames = BucketStores.spriteFrames.fall;

        if(this.frameFall  >= frames.length) {
            this.frameFall = 0;
        }
        this.posX = frames[this.frameFall].x;
        this.posY = frames[this.frameFall].y;
        this.width = frames[this.frameFall].width;
        this.height = frames[this.frameFall].height;
        this.noOfFall = 0;
    }
    return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
};

