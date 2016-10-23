var SoundManager = {
    SOUND_INTRO: 5,
    SOUND_START: 9,
    SOUND_JUMP: 6,
    SOUND_WALK: 8,
    SOUND_DIE: 1,
    SOUND_WIN: 4,
    SOUND_CLIMB: 7,
    SOUND_HAMMER: 2,
    SOUND_HAMMER_PUNCH: 0,
    SOUND_THROW_BARREL: 3,
    SOUND_LOSE_LIFE: 10,
    SOUND_DONKEY_WIN: 11,
    SOUND_SAVE_PRINCESS: 12,
    SOUND_FAILURE: 13,
    SOUND_SHOOT: 14,
    SOUND_WIN_OUTRO: 15,
    context: null,
    currentSounds: [],
    currentSound: null,
    initialize: function(callback) {

        if(typeof AudioContext === 'function') {
            SoundManager.context = new AudioContext();
        } else {
            return;
        }

        function onLoaded(buffers) {
            SoundManager.context.buffers = buffers;
            callback();
        }

        var loader = new BufferLoader(SoundManager.context, [
            'sounds/hammer_punch.wav',  // 0
            'sounds/death.wav',         // 1
            'sounds/hammer.wav',        // 2
            'sounds/throwbarrel.wav',   // 3
            'sounds/win.mp3',           // 4
            'sounds/intro.mp3',         // 5
            'sounds/jump.wav',          // 6
            'sounds/climb.mp3',         // 7
            'sounds/walking.wav'  ,     // 8
            'sounds/gamestart.mp3',       // 9
            'sounds/death2.wav',        // 10
            'sounds/kongwin.mp3',        // 11
            'sounds/saveprincess.mp3',        // 12
            'sounds/failure.mp3',         // 13
            'sounds/shoot.wav',         // 14
            'sounds/win_outro.mp3'         // 15
        ], onLoaded);
        loader.load();
    },
    resetSound: function(soundIndex) {
        if(!SoundManager.context) { return; };
        var i = 0;
        for(i; i < SoundManager.currentSounds.length; i++) {
            if(SoundManager.currentSounds[i].soundIndex === soundIndex) {
                SoundManager.currentSounds.splice(i, 1);
                break;
            }
        }
    },
    stop:function() {
        if(!SoundManager.context) { return; };
        if(this.currentSound) {
            this.currentSound.stop();
        }

    },

    play: function(soundIndex) {
        if(!SoundManager.context) { return; };
        if(!SoundManager.context.buffers) {
            return;
        }

        var ignoreSound = false;
        var soundArray = SoundManager.currentSounds;


        // Check if sound is already playing
        soundArray.forEach(function(sound) {
            if(sound.soundIndex === soundIndex) {
                ignoreSound = true;
            }
        });

        if(!ignoreSound) {
            // Start play and add to current sounds array
            this.currentSound = SoundManager.context.createBufferSource();
            this.currentSound.buffer = SoundManager.context.buffers[soundIndex];
            this.currentSound.connect(SoundManager.context.destination);
            this.currentSound.start(0);

            SoundManager.currentSounds.push({ soundIndex: soundIndex, sound: this.currentSound });

            this.currentSound.onended = function() {
                SoundManager.resetSound(soundIndex);
            }
        }
    }
};