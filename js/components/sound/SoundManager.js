var SoundManager = {
    SOUND_INTRO: 5,
    SOUND_JUMP: 7,
    SOUND_WALK: 9,
    SOUND_DIE: 1,
    SOUND_WIN: 4,
    SOUND_CLIMB: 8,
    SOUND_HAMMER: 2,
    SOUND_HAMMER_PUNCH: 0,
    SOUND_THROW_BARREL: 3,
    SOUND_DONKEY_WIN: 6,
    context: new AudioContext(),
    currentSounds: [],
    initialize: function(callback) {

        function onLoaded(buffers) {
            SoundManager.context.buffers = buffers;
            callback();
        }

        var loader = new BufferLoader(SoundManager.context, [
            'sounds/hammer_punch.wav',  // 0
            'sounds/death.mp3',         // 1
            'sounds/hammer.wav',        // 2
            'sounds/throwbarrel.wav',   // 3
            'sounds/win.mp3',           // 4
            'sounds/intro.mp3',         // 5
            'sounds/dkwin.mp3',         // 6
            'sounds/jump.wav',          // 7
            'sounds/climb.mp3',         // 8
            'sounds/walking.wav',       // 9
        ], onLoaded);
        loader.load();
    },
    resetSound: function(soundIndex) {
        var i = 0;
        for(i; i < SoundManager.currentSounds.length; i++) {
            if(SoundManager.currentSounds[i].soundIndex === soundIndex) {
                SoundManager.currentSounds.splice(i, 1);
                break;
            }
        }
    },
    play: function(soundIndex) {
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
            var currentSound = SoundManager.context.createBufferSource();
            currentSound.buffer = SoundManager.context.buffers[soundIndex];
            currentSound.connect(SoundManager.context.destination);
            currentSound.start(0);

            SoundManager.currentSounds.push({ soundIndex: soundIndex, sound: currentSound });

            currentSound.onended = function() {
                SoundManager.resetSound(soundIndex);
            }
        }
    }
};