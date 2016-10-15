var TileBase = function(_type, _posX, _posY) {
    this.type = _type;
    this.x = _posX;
    this.y = _posY;
    this.width = 40;
    this.height = 20;
    this.tileImg = new Image();
    this.tileImg.onload = function() {
        console.log("load tile finished");
    };
    this.tileImg.src = './images/block.png';
};

TileBase.prototype.draw = function() {
    if(this.type === 'block') {
        this.drawBlock();
    }
};

TileBase.prototype.drawBlock = function() {
    GameStores.getCanvasContext().drawImage(this.tileImg, this.x, this.y, this.width, this.height);
};


