const GameStores = {
    sceneWidth:800,
    sceneHeight:700,
    isResetLevel:false,
    level: 1,
    maxLevel: 3,
    totalScore: 0,
    isStartGame: false,
    setCanvasContext: function(ctx) {
        this.ctx = ctx;
    },
    getCanvasContext: function() {
        return this.ctx;
    }
};
