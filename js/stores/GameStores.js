const GameStores = {
    sceneWidth:800,
    sceneHeight:700,
    setCanvasContext: function(ctx) {
        this.ctx = ctx;
    },
    getCanvasContext: function() {
        return this.ctx;
    }
};
