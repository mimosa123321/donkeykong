var Player = function() {
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
        /*var bucketObj = {
            x: bucket.pos.x,
            y: bucket.pos.y,
            r: bucket.radius * 0.5
        };
        var playerObj = {
            x: this.pos.x,
            y: this.pos.y,
            w: PlayerStores.bodyWidth,
            h: PlayerStores.bodyHeight
        };*/
        // console.log(rectCircleColliding(bucketObj,playerObj));
        // if(rectCircleColliding(bucketObj,playerObj)) {
        //     console.log('die');
        // }
    }
};

Player.prototype.die = function() {
    PlayerStores.isDie = true;
    // this.isDie = true;
};

Player.prototype.draw = function() {
    var posX;
    var posY;
    var width;
    var height;
    var animation;

    if(!PlayerStores.isDie) {
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

        //update floor level when its state is not jump - have errors when update currentlevel when jump
        if(!this.isJump) {
            this.store.currentLevel =  this.updateFloorLevel();
        }
    }else {
        this.pos.y = FloorStores.getLevels()[this.store.currentLevel].posY - PlayerStores.bodyHeight;
        animation = PlayerAnimation.die(this.lastDirection);
    }

    if(animation) {
        posX = animation.posX;
        posY = animation.posY;
        width = animation.width;
        height = animation.height;

        GameStores.getCanvasContext().drawImage(this.player, posX, posY, width, height, this.pos.x, this.pos.y, width, height);
    }


};

/*function rectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    // console.log(distX,distY);
    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }
    if (distX <= (rect.w/2)) { return true; }
    if (distY <= (rect.h/2)) { return true; }
    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}*/



