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
                SoundManager.play(SoundManager.SOUND_WIN_OUTRO);
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
        animate.animationEnd($('#letter_g'), function() {
            $('#intro-mario').removeClass('play');
            $('#intro-donkey').addClass('play');
        });

        animate.animationEnd($('#intro-donkey'), function() {
            $('#intro-donkey').removeClass('play');
            $('#intro-mario').addClass('play');
        });

        animate.animationEnd($('#intro-mario'), function() {
            $('#intro-mario').removeClass('play');
            $('#intro-donkey').addClass('play');
        });
    },

    hideIntro: function() {
        var el = document.getElementById("intro");
        el.className = "hide";
    },

    loseLife: function() {
        var el = document.getElementById("die");
        el.className = "show";
        var img = el.getElementsByTagName("img");
        var disappearLife = img[PlayerStores.totalLife];

        setTimeout(function(){
            disappearLife.className = "hide";
        },100);

        setTimeout(function(){
            SoundManager.play(SoundManager.SOUND_LOSE_LIFE);
        },950);
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
        var mario = document.querySelector(".mariojump");
        mario.classList.add("start");
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
        h1.innerHTML = "Level " + GameStores.level;
    },

    updateScore: function() {
        var el = document.getElementById("score");
        el.innerHTML = GameStores.totalScore;

        $(".finalScore").html(GameStores.totalScore);
    }
};

var animate = {
    transitionEnd: function(ele, callbackFunc) {
        $(ele).unbind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd');
        $(ele).bind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd', function() {
            $(ele).unbind('webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd');
            if (callbackFunc) {
                callbackFunc.apply();
            }
        });
    },

    animationEnd: function(ele, callbackFunc) {
        $(ele).bind('animationend webkitAnimationEnd MSAnimationEnd oanimationend', function() {
            if (callbackFunc) {
                callbackFunc.apply();
            }
        });
    }
};

