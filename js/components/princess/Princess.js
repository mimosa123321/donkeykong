var Princess = function() {
    this.ctx = GameStores.getCanvasContext();
    this.currentLevel = 6;
    this.animation;
    this.init();
};


Princess.prototype.init = function() {
    var _this = this;

    this.animation = new PrincessAnimation();
    var startPoint = this.setStartPoint();
    this.pos = {
        x: startPoint.x,
        y: startPoint.y
    };

    this.princessImg = new Image();
    this.princessImg.onload = function() {
        GameStores.getCanvasContext().drawImage(this, _this.pos.x, _this.pos.y , 0, 0);
    };
    this.princessImg.src = './images/princess.png';
};

Princess.prototype.setStartPoint = function() {
    var topFloor  = FloorStores.getFloorsMap()[this.currentLevel].floorMap;
    var tile = topFloor[9];
    return {x: tile.x, y: tile.y}
};

Princess.prototype.draw = function() {
    this.animation.help();

    this.animPosX = this.animation.posX;
    this.animposY = this.animation.posY;
    this.animWidth = this.animation.width;
    this.animHeight = this.animation.height;

    this.ctx.beginPath();
    this.ctx.drawImage(this.princessImg, this.animPosX, this.animposY , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight - 1);
};


