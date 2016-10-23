var EnemiesManager = function() {
    this.maxEnemies= 5;
    this.resetTimer = 200;
    this.resetCountDown = 0;
    this.initBucket();
};

EnemiesManager.prototype.initBucket = function() {
    if(GameStores.level === 3) {
        this.maxEnemies= 8;
    }

    for(var i=0; i<this.maxEnemies; i++) {
        var type;
        if(GameStores.level === 1) {
            type = "fire";
        }else if(GameStores.level === 2) {
            type = "water";
        }else {
            type = (Math.ceil(Math.random()*2) === 1)? "fire":"water";
        }
        var randomFloor = Math.floor(Math.random()* 6);
        var enemy = new Enemy(type, randomFloor);
        EnemyStores.enemies.push(enemy);
    }
};

EnemiesManager.prototype.draw = function() {
    var i, enemies = EnemyStores.enemies;
    if(GameStores.isStartGame) {
        for(i=0; i<enemies.length; i++) {
            var enemy = enemies[i];
            if(enemy.isAlive) {
                enemy.draw();
            }else {
                this.resetCountDown += 1;
                if(this.resetCountDown >= this.resetTimer) {
                    enemy.reset();
                    this.resetCountDown = 0;
                }
            }
        }
    }
};

EnemiesManager.prototype.reset = function() {
    EnemyStores.enemies = [];
    this.resetCountDown = 0;
    this.initBucket();
};


