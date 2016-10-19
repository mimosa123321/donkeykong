const FloorStores = {
    tileWidth: 40,
    tileHeight: 20,
    totalFloor: 6,
    spaceBetweenFloor: 100,
    minTiles: 12,
    maxHoles: 2,
    floorsMap: [],
    laddersMap: [],
    ladderWidth: 30,
    getMaxTiles: function() {
        return Math.ceil(GameStores.sceneWidth / FloorStores.tileWidth);
    },
    setFloorsMap:function(map) {
        FloorStores.floorsMap.push(map);
    },
    getFloorsMap:function() {
        return FloorStores.floorsMap;
    },

    setLaddersMap:function(map) {
        FloorStores.laddersMap.push(map);
    },
    getLadderMap:function() {
        return FloorStores.laddersMap;
    },

    getLevels: function() {
        var i, arr = [];
        for(i=0; i<FloorStores.totalFloor; i++) {
            arr.push({
                'lv': i + 1,
                'posY': GameStores.sceneHeight - FloorStores.tileHeight - FloorStores.spaceBetweenFloor * i
            })
        }
        return arr;
    }
};

