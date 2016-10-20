var FloorsManager = function() {
    this.initFloor();
};

FloorsManager.prototype.initFloor = function() {
    var i, type;
    for(i=0; i<FloorStores.totalFloor; i++) {
        var floor = new Floor((i + 1));
        FloorStores.setFloorsMap(floor);
    }
};

FloorsManager.prototype.draw = function() {
    var i, floorsMap = FloorStores.getFloorsMap();
    for(i=0; i<floorsMap.length; i++) {
        var floor = floorsMap[i];
        floor.draw();
    }


};