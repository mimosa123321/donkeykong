const PlayerAnimation = {
    noOfWalk :0,
    frameWalk : 1,
    counterWalk : 10,
    posX: 2,
    posY: 2,

    walk: function(direction) {
        var frames = [];
        this.noOfWalk += 1;

        if(this.noOfWalk  >= this.counterWalk) {
            this.frameWalk += 1;
            if(direction === 'left') {
                frames = PlayerStores.spriteFrames.walk.left;
            }else if(direction === 'right') {
                frames = PlayerStores.spriteFrames.walk.right;
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
    },

    stand:function(direction) {
        var frames = [];
        if(direction === 'left') {
            frames = PlayerStores.spriteFrames.stand.left;
        }else {
            frames = PlayerStores.spriteFrames.stand.right;
        }
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    },

    climb: function() {
        var frames = PlayerStores.spriteFrames.climb;
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    },

    jump: function(direction) {
        var frames = [];
        if(direction === 'left') {
            frames = PlayerStores.spriteFrames.jump.left;
        }else {
            frames = PlayerStores.spriteFrames.jump.right;
        }
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    },

    die: function(direction) {
        var frames = [];
        if(direction === 'left') {
            frames = PlayerStores.spriteFrames.die.left;
        }else {
            frames = PlayerStores.spriteFrames.die.right;
        }
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    }

};

