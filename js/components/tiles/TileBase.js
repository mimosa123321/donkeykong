var TileBase = function(_type, _posX, _posY) {
    this.type = _type;
    this.x = _posX;
    this.y = _posY;
    this.width = 40;
    this.height = 20;
    this.ctx = GameStores.getCanvasContext();
};

TileBase.prototype.draw = function() {
    if(this.type === 'block') {
        this.drawBlock();
    }
};

TileBase.prototype.drawBlock = function() {
    this.ctx.beginPath();

    if(GameStores.level === 1) {
        this.ctx.fillStyle="#ff2155";
    }else if(GameStores.level === 2) {
        this.ctx.fillStyle="#00ffff";
    }

     // this.ctx.fillStyle="#ff2155";
    this.ctx.fillRect(this.x, this.y, this.width, 3);


    if(GameStores.level === 1) {
        this.ctx.fillStyle="#ff2155";
    }else if(GameStores.level === 2) {
        this.ctx.fillStyle="#00ffff";
    }
    // this.ctx.fillStyle="#ff2155";
    this.ctx.fillRect(this.x, this.y + this.height - 3, this.width, 3);

    if(GameStores.level === 1) {
        this.ctx.fillStyle="#970000";
    }else if(GameStores.level === 2) {
        // this.ctx.fillStyle="#00ffff";
    }

    // this.ctx.fillStyle="#970000";
    this.ctx.fillRect(this.x, this.y + 3, this.width, 3);

    if(GameStores.level === 1) {
        this.ctx.fillStyle="#970000";
    }else if(GameStores.level === 2) {
        // this.ctx.fillStyle="#00ffff";
    }

    // this.ctx.fillStyle="#970000";
    this.ctx.fillRect(this.x, this.y + this.height - 6, this.width, 3);


    if(GameStores.level === 1) {
        this.ctx.strokeStyle="#970000";
    }else if(GameStores.level === 2) {
        // this.ctx.strokeStyle="#00ffff";
    }

    // this.ctx.strokeStyle = "#970000";
    this.ctx.moveTo(this.x,this.y + this.height - 3);
    this.ctx.lineTo(this.x + 10, this.y + 3);
    this.ctx.lineTo(this.x + 20, this.y + this.height - 3);
    this.ctx.lineTo(this.x + 20 - 5, this.y + this.height - 3);
    this.ctx.lineTo(this.x + 10, this.y + 9);
    this.ctx.lineTo(this.x + 5, this.y + this.height - 3);
    //

    if(GameStores.level === 1) {
        this.ctx.fillStyle="#970000";
    }else if(GameStores.level === 2) {
        // this.ctx.fillStyle="#00ffff";
    }

    // this.ctx.fillStyle="#970000";
    this.ctx.moveTo(this.x + 20,this.y + this.height - 3);
    this.ctx.lineTo(this.x + 10 + 20, this.y + 3);
    this.ctx.lineTo(this.x + 20 + 20, this.y + this.height - 3);
    this.ctx.lineTo(this.x + 20 - 5 + 20, this.y + this.height - 3);
    this.ctx.lineTo(this.x + 10 + 20, this.y + 9);
    this.ctx.lineTo(this.x + 5 + 20, this.y + this.height - 3);
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    this.ctx.fill();

    // this.ctx.stroke();
};
