var floorsManager, player, ladders, bucketsManager, donkey, princess;
function init() {
    initCanvas();
}

function initCanvas() {
    var canvas = document.getElementById('canvas');
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.canvas.width = GameStores.sceneWidth;
        ctx.canvas.height = GameStores.sceneHeight;
        GameStores.setCanvasContext(ctx);
    }else {
        return;
    }

    initFloor();
    initLadder();
    initPlayer();
    initKeyBoard();
    setInterval(draw, 10);
    initBucket();
    initDockey();
    initPrincess();
}

function initFloor() {
    floorsManager = new FloorsManager();
}

function initLadder() {
    ladders = new Ladders();
}

function initPlayer() {
    player = new Player();
}

function initBucket(){
    bucketsManager = new BucketsManager();
}

function initDockey(){
    donkey = new Donkey();
}

function initPrincess() {
    princess = new Princess();
}

function draw() {
    GameStores.getCanvasContext().clearRect(0,0,GameStores.sceneWidth, GameStores.sceneHeight);
    GameStores.getCanvasContext().beginPath();
    floorsManager.draw();
    ladders.draw();

    player.draw();
    bucketsManager.draw();
    donkey.draw();
    princess.draw();
}

function initKeyBoard() {
    document.addEventListener('keydown', function(event){
        switch (event.keyCode) {
            case 37:
                player.direction = 'left';
                break;
            case 39:
                player.direction = 'right';
                break;
            case 32:
                player.startJump();
                break;
            case 38:
                if(!player.isJump) {
                    player.climb("up");
                }
                break;
            case 40:
                if(!player.isJump) {
                    player.climb("down");
                }
                break;
            default:
                break;
        }
    });

    document.addEventListener('keyup', function(event){
        // console.log('up : ', event.keyCode);
        if(event.keyCode === 39 || event.keyCode === 37) {
            player.restoreKey();
        }

    });
}

window.addEventListener("load", function(){
    init();
});



