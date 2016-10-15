const PlayerStores = {
    bodyWidth: 40,
    bodyHeight: 40,
    stepDistance: 1,
    jumpDistance: 25,
    currentLevel: 0,
    positions: {
        x: 0,
        y: 0
    },
    setPositions: function(_x, _y) {
        this.positions.x = _x;
        this.positions.y = _y;
    },

    getPositions: function() {
        return PlayerStores.positions;
    }
};
