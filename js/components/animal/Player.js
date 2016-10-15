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
        GameStores.getCanvasContext().drawImage(this, PlayerStores.getPositions().x, PlayerStores.getPositions().y, PlayerStores.bodyWidth, PlayerStores.bodyHeight);
    };
    this.player.src = './images/player.png';
};

Player.prototype.setInitialPosition = function() {
    var x = (GameStores.sceneWidth - PlayerStores.bodyWidth) * 0.5,
        y = GameStores.sceneHeight - FloorStores.tileHeight - PlayerStores.bodyHeight;
    PlayerStores.setPositions(x,y);
};

Player.prototype.draw = function() {
    if(this.isJump) {
        this.startJump();
    }

    if(this.isFall) {
        this.startFall();
    }

    if(!this.isJump && !this.isFall) {
        this.collideFloor();
    }

    if(this.direction) {
        this.move(this.direction);
    }

    if(!this.isJump) {
        this.store.currentLevel =  this.updateFloorLevel();
    }

    GameStores.getCanvasContext().drawImage(this.player, PlayerStores.getPositions().x, PlayerStores.getPositions().y, PlayerStores.bodyWidth, PlayerStores.bodyHeight);
};



