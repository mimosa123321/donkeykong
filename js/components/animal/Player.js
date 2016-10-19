var Player = function() {
    AnimalBase.call(this, PlayerStores);
    this.setInitialPosition();
    this.init();
};

Player.BODY_WIDTH = PlayerStores.bodyWidth;
Player.BODY_HEIGHT = PlayerStores.bodyHeight;

Player.prototype = Object.create(AnimalBase.prototype);
Player.prototype.constructor = Player;

Player.prototype.init = function() {
    this.player = new Image();
    this.player.onload = function() {
        // GameStores.getCanvasContext().drawImage(this, PlayerStores.getPositions().x, PlayerStores.getPositions().y, PlayerStores.bodyWidth, PlayerStores.bodyHeight);
        GameStores.getCanvasContext().drawImage(this, PlayerStores.getPositions().x, PlayerStores.getPositions().y, PlayerStores.bodyWidth, PlayerStores.bodyHeight);
    };
    this.player.src = './images/marioss.png';
};

Player.prototype.setInitialPosition = function() {
    var x = (GameStores.sceneWidth - PlayerStores.bodyWidth) * 0.5,
        y = GameStores.sceneHeight - FloorStores.tileHeight - PlayerStores.bodyHeight;
    PlayerStores.setPositions(x,y);
};

Player.prototype.draw = function() {
    var posX;
    var posY;
    var width;
    var height;
    var animation;

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

    //update floor level when its state is not jump - have errors when update currentlevel when jump
    if(!this.isJump) {
        this.store.currentLevel =  this.updateFloorLevel();
    }

    posX = animation.posX;
    posY = animation.posY;
    width = animation.width;
    height = animation.height;

    GameStores.getCanvasContext().drawImage(this.player, posX, posY, width, height, PlayerStores.getPositions().x, PlayerStores.getPositions().y, width, height);
};



