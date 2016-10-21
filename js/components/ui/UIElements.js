var UIElements = {
    showPanel: function(type) {
        var panel = document.getElementById('panel');
        panel.className = "show";
        switch(type){
            case "intro":
                this.intro();
                break;

            case "die":
                this.loseLife();
                break;

            case "gameOver":
                this.gameOver();
                break;

            case "nextLevel":
                this.goNextLevel();
                break;

            case "win":
                this.win();
                break;

            default:
                break;

        }
    },

    hidePanel: function() {
        var _this = this;
        var panel = document.getElementById('panel');
        panel.className = "";

        setTimeout(function() {
            _this.hideContents();
        },2000);
    },

    intro: function() {
        var el = document.getElementById("intro");
        el.className = "show";
    },

    hideIntro: function() {
        var el = document.getElementById("intro");
        el.className = "";
    },

    loseLife: function() {
        var el = document.getElementById("die");
        el.className = "show";
        var img = el.getElementsByTagName("img");
        var disappearLife = img[PlayerStores.totalLife];

        setTimeout(function(){
            disappearLife.className = "hide";
        },100);
    },

    hideLoseLife: function() {
        var el = document.getElementById("die");
        el.className = "";
    },

    gameOver: function() {
        var el = document.getElementById("gameOver");
        el.className = "show";
    },

    goNextLevel: function() {
        var el = document.getElementById("nextLevel");
        el.className = "show";

        var h1 = el.getElementsByTagName("h1")[0];
        h1.innerHTML = "Level " + GameStores.level;
    },

    hideGoNextLevel: function() {
        var el = document.getElementById("nextLevel");
        el.className = "";
    },

    win:function() {
        var el = document.getElementById("win");
        el.className = "show";
    },

    hideWin:function() {
        var el = document.getElementById("win");
        el.className = "";
    },

    hideContents:function() {
        this.hideLoseLife();
        this.hideGoNextLevel();
        this.hideWin();
        this.hideIntro();
    },

    updateLifes: function() {
        var el = document.getElementById("marioLife");
        var img = el.getElementsByTagName("img");
        var life = img[PlayerStores.totalLife];
        life.style.display = "none";
    },

    updateLevels: function() {
        var el = document.getElementById("gameLevels");
        var h1 = el.getElementsByTagName("h1")[0];
        console.log(GameStores.level);
        h1.innerHTML = "Level " + GameStores.level;
        console.log(h1);
    }
};

