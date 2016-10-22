var EnemiesManager = function() {
    this.maxEnemies= 5;
    this.initBucket();
};

EnemiesManager.prototype.initBucket = function() {
    for(var i=0; i<this.maxEnemies; i++) {
        var type;
        if(GameStores.level === 1) {
            type = "fire";
        }else {
            type = "water";
        }
        var randomFloor = Math.floor(Math.random()* 6);
        var enemy = new Enemy(type, randomFloor);
        EnemyStores.enemies.push(enemy);
    }
};

EnemiesManager.prototype.draw = function() {
    var i, enemies = EnemyStores.enemies;
    for(i=0; i<enemies.length; i++) {
        var enemy = enemies[i];
        if(enemy.isAlive) {
            enemy.draw();
        }

    }
};

EnemiesManager.prototype.reset = function() {
    EnemyStores.enemies = [];

    this.initBucket();
};


