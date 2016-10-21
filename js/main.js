var floorsManager, player, ladders, bucketsManager, donkey, princess;
function init() {
    this.isShowPanel = false;

    SoundManager.play();
    UIElements.showPanel("intro");

    setTimeout(function() {
        initCanvas();
    }, 4000);
    setTimeout(function() {
        UIElements.hidePanel("intro");
    }, 6000);
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
    initBucket();
    initDockey();
    initPrincess();

    setInterval(draw, 10);
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


    /*------------------die----------------------*/
    if(!this.isShowPanel && PlayerStores.isDie) {
        this.isShowPanel = true;
        goDie();
    }

    /*-----------------win---------------------------*/
    if(!this.isShowPanel && PlayerStores.isWin) {
        this.isShowPanel = true;
        goNextLevel();
    }
}

function goDie() {
    PlayerStores.totalLife -= 1;

    //showPanel
    setTimeout(function(){
        UIElements.showPanel("die");
        UIElements.updateLifes();
    },1500);

    if(PlayerStores.totalLife <= 0) {
        setTimeout(function(){
            UIElements.showPanel("gameOver");
        },3000);
        return;
    }

    //hidePanel
    setTimeout(function(){
        UIElements.hidePanel();
        resetLevel();
        this.isShowPanel = false;
    },4000);
}

function goNextLevel() {
    GameStores.level += 1;

    if(GameStores.level > GameStores.maxLevel) {
        setTimeout(function(){
            UIElements.showPanel("win");
        },1500);
        return;
    }

    setTimeout(function(){
        UIElements.showPanel("nextLevel");
        UIElements.updateLevels();
    },1500);

    //hidePanel
    setTimeout(function(){
        UIElements.hidePanel();
        newLevel();
        this.isShowPanel = false;
    },4000);
}

function resetLevel() {
    player.reset();
    bucketsManager.reset();
    donkey.reset();

    PlayerStores.isDie = false;
    PlayerStores.isWin = false;
}

function newLevel() {
    floorsManager.reset();
    ladders.reset();

    player.reset();
    bucketsManager.reset();
    donkey.reset();
    donkey.init();

    PlayerStores.isDie = false;
    PlayerStores.isWin = false;
}



function initKeyBoard() {
    document.addEventListener('keydown', function(event){
        switch (event.keyCode) {
            case 37:
                player.direction = 'left';
                SoundManager.play(SoundManager.SOUND_WALK);
                break;
            case 39:
                player.direction = 'right';
                SoundManager.play(SoundManager.SOUND_WALK);
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
        if(event.keyCode === 39 || event.keyCode === 37) {
            player.restoreKey();
        }

    });
}

window.addEventListener("load", function(){
    init();
});



