var Ladders = function(){
    this.ctx = GameStores.getCanvasContext();
    this.init();
};

Ladders.prototype.init = function() {
    var i,j;
    for(i=0; i<FloorStores.getFloorsMap().length; i++) {
        var floor = FloorStores.getFloorsMap()[i],
            upFloor =  FloorStores.getFloorsMap()[i+1],
            randomTilesForLadder = [];

        if(!upFloor) {
            console.log("object not exist");
            continue;
        }

        for(j=0; j<floor.floorMap.length; j++) {
            var tile = floor.floorMap[j],
                upTile = upFloor.floorMap[j],
                lastTile;

            //ensure the ladder built between block
            if(tile.type === 'block' && upTile.type === 'block') {
                lastTile = tile;
                if(this.isLadder()) {
                    var distanceBetweenPrevLadder;
                    if(randomTilesForLadder.length > 0) {
                        //ensure the ladders cannot be so close
                        distanceBetweenPrevLadder = tile.x - randomTilesForLadder[randomTilesForLadder.length - 1].x;
                        if(distanceBetweenPrevLadder < FloorStores.tileWidth * 5) {
                            console.log("ladders are too close:", tile);
                            continue;
                        }
                    }
                    randomTilesForLadder.push(tile);
                }
            }

            //if no ladder is generated, add the last tile for ladder (at least one tile for each level)
            if(j=== floor.floorMap.length - 1 && randomTilesForLadder.length === 0) {
                console.log("level ",i, " no generated ladder - put last tile as ladder");
                randomTilesForLadder.push(lastTile);
            }
        }
        FloorStores.setLaddersMap(randomTilesForLadder);
    }
};

Ladders.prototype.draw = function() {
    var i,j;
    for(i=0; i<FloorStores.laddersMap.length; i++) {
        for(j=0; j<FloorStores.laddersMap[i].length; j++) {
            var tile = FloorStores.laddersMap[i][j];
            var startX, startY;
            startX = 5 + tile.x;
            startY = tile.y - FloorStores.spaceBetweenFloor + FloorStores.tileHeight;
            this.ctx.rect(startX, startY, 5, 80);
            this.ctx.rect(startX + 25, startY, 5, 80);
            this.ctx.rect(startX, startY + 5, 30, 6);
            this.ctx.rect(startX, startY + 20, 30, 6);
            this.ctx.rect(startX, startY + 35, 30, 6);
            this.ctx.rect(startX, startY + 50, 30, 6);
            this.ctx.rect(startX, startY + 65, 30, 6);
            this.ctx.stroke();
        }
    }
};

Ladders.prototype.isLadder = function() {
    if(Math.floor(Math.random()*20) > 15 ) {
        return true;
    }else {
        return false;
    }
};

