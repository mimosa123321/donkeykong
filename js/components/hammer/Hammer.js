var Hammer = function() {
    this.ctx = GameStores.getCanvasContext();
    this.animation;

    this.init();
};

Hammer.prototype.init = function() {
    var _this = this;

    var startPoint = this.setStartPoint();

    this.pos = {
        x: startPoint.x,
        y: startPoint.y - 50
    };

    HammerStores.pos.x = this.pos.x;
    HammerStores.pos.y = this.pos.y;

    this.hammerImg = new Image();
    this.hammerImg.onload = function() {
        GameStores.getCanvasContext().drawImage(this, _this.pos.x, _this.pos.y , 0, 0);
    };
    this.hammerImg.src = './images/hammer.png';
};

Hammer.prototype.setStartPoint = function() {
    //hammer only exists on first four floor
    var randomFloor = Math.ceil(Math.random()* 4);
    var blockTiles = [];
    var floor  = FloorStores.getFloorsMap()[randomFloor].floorMap;

    for(var i=0; i<floor.length; i++) {
        var tile = floor[i];
        if(tile.type  === "block") {
            blockTiles.push(tile);
        }
    }

    var shuffleArr = blockTiles.shuffle();
    var tile = shuffleArr[0];
    return {x: tile.x, y: tile.y};
};

Hammer.prototype.draw = function() {
    if(!PlayerStores.getHammer) {
        this.animPosX = this.pos.x;
        this.animposY = this.pos.y;
        this.animWidth = HammerStores.width;
        this.animHeight = HammerStores.height;
        this.ctx.beginPath();
        this.ctx.drawImage(this.hammerImg, 0, 0 , this.animWidth, this.animHeight, this.pos.x, this.pos.y - this.animHeight, this.animWidth, this.animHeight);
    }

};


Hammer.prototype.reset = function() {
    this.init();
};


Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
