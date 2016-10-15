var Floor = function(_level) {
    this.level = _level;
    this.noOfHoles = 0;
    this.floorMap = [];
    this.init();
};

Floor.LEVELS = FloorStores.getLevels();
Floor.MAX_TILES = FloorStores.getMaxTiles();
Floor.MIN_TILES = FloorStores.minTiles;
Floor.MAX_HOLES = FloorStores.maxHoles;


Floor.prototype.init = function() {
    var i, floorProps = {};

    //the amount of tiles is the floor
    this.noOfTiles = (this.level === 1)? Floor.MAX_TILES: this.tilesRandomizer();

    //start positionX for laying the floor at the center
    // startPosX = (GameStores.sceneWidth - (this.noOfTiles * FloorStores.tileWidth)) * 0.5;

    /*for(i=0; i<this.noOfTiles; i++) {
        var tilePosX = FloorStores.tileWidth * i + startPosX,
            tilePosY = Floor.LEVELS[this.level - 1].posY,
            tileType = (this.isHole() === true && this.type !== 'ground')? 'hole':'block'; //ground floor has no holes

        floorProps = {
            type: tileType,
            x: tilePosX,
            y: tilePosY
        };
        this.floorMap.push(floorProps);
    }*/

    for(i=0; i<Floor.MAX_TILES; i++) {
        var tilePosX = FloorStores.tileWidth * i,
            tilePosY = Floor.LEVELS[this.level - 1].posY,
            tileType = (this.isHole(i) === true && this.level !== 1)? 'hole':'block'; //level1 has no holes
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


