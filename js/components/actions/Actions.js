var Actions = {
    move: function(x, y, width, height, direction, distance) {
        var posX, posY;
        switch (direction) {
            case 'left':
                posX = x - distance;
                posY = y;
                if(posX < 0) {
                    posX = 0;
                }

                return {x:posX, y:posY};
                break;

            case 'right':
                posX = x + distance;
                posY = y;
                if(posX > GameStores.sceneWidth - width) {
                    posX = GameStores.sceneWidth - width;
                }
                return {x:posX, y:posY};
                break;
            default:
                break;
        }
    },

    fall :function(x,y, width, height, currentLevel, distance) {
        var posX = x,
            posY = y,
            stopFall = false,
            destFallY = FloorStores.getLevels()[currentLevel - 1].posY; //set the destination Y when fall

        posY += distance;

        if(posY >= destFallY) {
            posY = destFallY;
            stopFall = true;
        }

        return {x:posX, y:posY, stop:stopFall};
    },

    collideHole: function(x, y, width, height, currentLevel) {
        var i,
            posX = x,
            floor = FloorStores.getFloorsMap()[currentLevel].floorMap;

        if(currentLevel === 0) {
            return;
        }

        for(i=0; i<floor.length; i++) {
            var tile = floor[i],
                tileType = tile.type,
                tileX = tile.x,
                tileWidth = FloorStores.tileWidth;

            if(tileType === "hole" && posX> tileX && posX + width < tileX + tileWidth) { //if hole, fall
                return true;
            }else {
                continue;
            }
        }
    },

    collideLadder: function(x, y, width, height, currentLevel, direction, offset) {
        var i,
            posX = x,
            posY = y,
            currentLevel = currentLevel,
            destY,
            ladders = FloorStores.getLadderMap()[currentLevel];

        switch (direction) {
            case "up":
                if (currentLevel === FloorStores.totalFloor - 1) { //can't climb up when it's on the most top level
                    return;
                }
                destY = FloorStores.getLevels()[currentLevel + 1].posY; //destY is at one top level
                ladders = FloorStores.getLadderMap()[currentLevel];  //ladders position at current level
                break;

            case "down":
                if (currentLevel === 0) { //if level 0, no down level
                    return;
                }
                ladders = FloorStores.getLadderMap()[currentLevel - 1];
                destY = FloorStores.getLevels()[currentLevel - 1].posY;
                break;

            default:
                break;
        }

        for(i=0; i<ladders.length; i++) {
            var ladder = ladders[i];

            //czeck collision with ladder
            if(posX > ladder.x + offset.minX && posX + width < ladder.x + FloorStores.ladderWidth) {
                return true;
            }else {
                continue;
            }
        }

        return false;

    }

};