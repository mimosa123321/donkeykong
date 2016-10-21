var EnemyAnimation = function() {
    this.noOfWalk = 0;
    this.frameWalk = 1;
    this.counter = 10;
};


EnemyAnimation.prototype.walk = function(type, direction) {
    var frames = [];
    this.noOfWalk += 1;

    if(this.noOfWalk  >= this.counter) {
        this.frameWalk += 1;

        if(type === "fire") {
            if(direction === 'left') {
                frames = EnemyStores.spriteFrames.fire.walk.left;
            }else {
                frames = EnemyStores.spriteFrames.fire.walk.right;
            }
        }else if(type === "water") {
            if(direction === 'left') {
                frames = EnemyStores.spriteFrames.water.walk.left;
            }else {
                frames = EnemyStores.spriteFrames.water.walk.right;
            }
        }

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

