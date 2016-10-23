var floorsManager, player, ladders, bucketsManager, donkey, princess, enemiesManager, hammer;
function init() {
    this.isShowPanel = false;

    SoundManager.initialize(function() {
        SoundManager.play(SoundManager.SOUND_INTRO);
    });

    UIElements.intro();
    initKeyBoard();
}

function startGame() {
    UIElements.hideIntro("intro");
    SoundManager.stop();
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
    initBucket();
    initDockey();
    initEnemy();
    initPrincess();
    initHammer();

    UIElements.updateScore();
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

function initEnemy() {
    enemiesManager = new EnemiesManager();
}

function initHammer() {
    hammer = new Hammer();
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
    enemiesManager.draw();
    hammer.draw();

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
            SoundManager.play(SoundManager.SOUND_FAILURE);
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
    GameStores.totalScore += 10000;

    UIElements.updateScore();
    if(GameStores.level > GameStores.maxLevel) {
        setTimeout(function(){
            UIElements.showPanel("win");
            // SoundManager.play(SoundManager.SOUND_SAVE_PRINCESS);
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
    enemiesManager.reset();
    donkey.reset();

    resetStores();
}

function newLevel() {
    floorsManager.reset();
    ladders.reset();

    player.reset();
    bucketsManager.reset();
    enemiesManager.reset();
    donkey.reset();
    donkey.init();
    hammer.reset();

    resetStores();
}

function resetStores() {
    PlayerStores.getHammer = false;
    PlayerStores.isDie = false;
    PlayerStores.isWin = false;
}

function initKeyBoard() {
    document.addEventListener('keydown', function(event){
        if(GameStores.isStartGame) {
            // console.log("start game:" , event.keyCode);
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
                    if (!player.isJump) {
                        SoundManager.play(SoundManager.SOUND_CLIMB);
                        player.climb("up");
                    }
                    break;
                case 40:
                    if (!player.isJump) {
                        SoundManager.play(SoundManager.SOUND_CLIMB);
                        player.climb("down");
                    }
                    break;
                case 16:
                    if (!player.isJump) {
                        player.beat();
                    }
                    break;
                default:
                    break;
            }
        }else {
            if(event.keyCode === 13 ) { //press enter to start
                console.log("start game");
                startGame();
            }
        }

        if(PlayerStores.totalLife <= 0 || GameStores.level > GameStores.maxLevel) {
            if(event.keyCode === 13 ) { //press enter to start
                // restart game
                console.log("restart");
                window.location.reload();
            }
        }
    });

    document.addEventListener('keyup', function(event){
        if(GameStores.isStartGame) {
            if(event.keyCode === 39 || event.keyCode === 37) {
                player.restoreKey();
            }
        }
    });
}

window.addEventListener("load", function(){
    init();
});



