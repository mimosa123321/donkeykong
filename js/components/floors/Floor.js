var Floor = function(_level) {
    this.level = _level;
    this.noOfHoles = 0;
    this.floorMap = [];
    this.init();
};

Floor.LEVELS = FloorStores.getLevels();
Floor.MAX_TILES = FloorStores.getMaxTiles();
Floor.MIN_TILES = FloorStores.minTiles;


Floor.prototype.init = function() {
    var i, floorProps = {};

    Floor.MAX_HOLES = (this.level  === 6)? 1 : FloorStores.maxHoles;

    //the amount of tiles is the floor
    if(this.level === 1) {
        this.noOfTiles = Floor.MAX_TILES;
    }else if(this.level === 7) {
        this.noOfTiles = 8; //for princess
    }else {
        this.noOfTiles = this.tilesRandomizer();
    }

    for(i=0; i<Floor.MAX_TILES; i++) {
        var tilePosX = FloorStores.tileWidth * i,
            tilePosY = Floor.LEVELS[this.level - 1].posY,
            tileType = (this.isHole(i) === true && this.level !== 1)? 'hole':'block'; //level1 has no holes

        if(this.level === 7) {
            tileType = 'block';
        }

        if(i < (Floor.MAX_TILES - this.noOfTiles) * 0.5 || i >= (Floor.MAX_TILES - ((Floor.MAX_TILES - this.noOfTiles) * 0.5))) {
            tileType = 'hole'; // hole are placed be
        }

        floorProps = {
            tile: i,
            tileBase: new TileBase(tileType, tilePosX, tilePosY),
            type: tileType,
            x: tilePosX,
            y: tilePosY
        };
        this.floorMap.push(floorProps);
    }
};

Floor.prototype.draw = function() {
    var i;
    for(i=0; i<this.floorMap.length; i++) {
        var type = this.floorMap[i].type;
        var posX = this.floorMap[i].x;
        var posY = this.floorMap[i].y;
        // var tile = new TileBase(type, posX, posY);
        var tileBase = this.floorMap[i].tileBase;
        tileBase.draw();
    }
};

Floor.prototype.tilesRandomizer = function() {
   return Math.floor(Math.random()*((Floor.MAX_TILES - 2) - Floor.MIN_TILES) + Floor.MIN_TILES);
};

Floor.prototype.isHole = function(tileId) {
    if(this.noOfHoles >= Floor.MAX_HOLES) {
        return false;
    }

    //check if previous tile is a hole, if yes , return false - prevent two holes link together
    if(this.floorMap[tileId - 1]) {
        if(this.floorMap[tileId - 1].type === 'hole') {
            console.log("double holes");
            return false;
        }
    }

    //the probability of producing hole should be lower than block -  5 / 20
    if(Math.floor(Math.random()*20) > 15 ) {
        this.noOfHoles ++;
        return true;
    }else {
        return false;
    }
};


