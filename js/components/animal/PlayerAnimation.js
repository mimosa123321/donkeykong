const PlayerAnimation = {
    noOfWalk :0,
    frameWalk : 1,
    counterWalk : 10,
    noOfBeat:0,
    frameBeat: 0,
    posX: 2,
    posY: 2,

    walk: function(direction) {
        var frames = [];
        this.noOfWalk += 1;

        if(this.noOfWalk  >= this.counterWalk) {
            this.frameWalk += 1;
            if(direction === 'left') {
                if(PlayerStores.getHammer) {
                    frames = PlayerStores.spriteFrames.hammerMode.walk.left;
                }else {
                    frames = PlayerStores.spriteFrames.normal.walk.left;
                }

            }else if(direction === 'right') {
                if(PlayerStores.getHammer) {
                    frames = PlayerStores.spriteFrames.hammerMode.walk.right;
                }else {
                    frames = PlayerStores.spriteFrames.normal.walk.right;
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
    },

    stand:function(direction) {
        var frames = [];
        if(direction === 'left') {
            if(PlayerStores.getHammer) {
                frames = PlayerStores.spriteFrames.hammerMode.stand.left;
            }else {
                frames = PlayerStores.spriteFrames.normal.stand.left;
            }
        }else {
            if(PlayerStores.getHammer) {
                frames = PlayerStores.spriteFrames.hammerMode.stand.right;
            }else {
                frames = PlayerStores.spriteFrames.normal.stand.right;
            }
        }
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    },

    climb: function() {
        var frames = PlayerStores.spriteFrames.normal.climb;
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    },

    jump: function(direction) {
        var frames = [];
        if(direction === 'left') {
            if(PlayerStores.getHammer) {
                frames = PlayerStores.spriteFrames.hammerMode.jump.left;
            }else {
                frames = PlayerStores.spriteFrames.normal.jump.left;
            }
        }else {
            if(PlayerStores.getHammer) {
                frames = PlayerStores.spriteFrames.hammerMode.jump.right;
            }else {
                frames = PlayerStores.spriteFrames.normal.jump.right;
            }
        }
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    },

    beat: function(direction) {
        var frames = [];
        this.noOfBeat += 1;
        var isFinish =false;

        if(this.noOfBeat  >= this.counterWalk) {
            if(direction === 'left') {
                frames = PlayerStores.spriteFrames.hammerMode.beat.left;

            }else if(direction === 'right') {
                frames = PlayerStores.spriteFrames.hammerMode.beat.right;
            }

            if(this.frameBeat  === frames.length - 1) {
                isFinish = true;
                this.frameBeat = 0;
            }
            this.posX = frames[this.frameBeat].x;
            this.posY = frames[this.frameBeat].y;
            this.width = frames[this.frameBeat].width;
            this.height = frames[this.frameBeat].height;
            this.noOfBeat = 0;

            this.frameBeat += 1;
        }
        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height, isFinish: isFinish};
    },

    die: function(direction) {
        var frames = [];
        if(direction === 'left') {
            frames = PlayerStores.spriteFrames.normal.die.left;
        }else {
            frames = PlayerStores.spriteFrames.normal.die.right;
        }
        this.posX = frames[0].x;
        this.posY = frames[0].y;
        this.width = frames[0].width;
        this.height = frames[0].height;

        return {"posX":this.posX, "posY":this.posY, "width":this.width, "height":this.height};
    }

};

