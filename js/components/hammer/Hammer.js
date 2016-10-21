var Hammer = function() {
    this.ctx = GameStores.getCanvasContext();
    this.currentLevel = 5;
    this.animation;

    this.init();
};

Hammer.prototype.init = function() {
    var _this = this;

    var startPoint = this.setStartPoint();

    this.pos = {
        x: startPoint.x,
        y: startPoint.y
    };



    this.hammerImg = new Image();
    this.hammerImg.onload = function() {
        GameStores.getCanvasContext().drawImage(this, _this.pos.x, _this.pos.y , 0, 0);
    };
    this.hammerImg.src = './images/hammer.png';
};

Hammer.prototype.setStartPoint = function() {
    //hammer only exists on first four floor
    var randomFloor = Math.floor(Math.random()* 4);

    var topFloor  = FloorStores.getFloorsMap()[randomFloor].floorMap;
    for(var i=0; i<topFloor.length; i++) {
        var tile = topFloor[i];

        if(tile.type  === "block") {
            console.log(tile);
            return {x: tile.x, y: tile.y}
        }
    }
};

Hammer.prototype.draw = function() {

    this.animPosX = this.pos.x;
    this.animposY = this.pos.y;
    this.animWidth = HammerStores.width;
    this.animHeight = HammerStores.height;

    // console.log( this.animPosX);

    this.ctx.beginPath();
    this.ctx.drawImage(this.hammerImg, this.animPosX, this.animposY , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight);

};
