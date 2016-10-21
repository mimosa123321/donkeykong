var SoundManager = {
    SOUND_INTRO: 5,
    SOUND_JUMP: 7,
    SOUND_WALK: 9,
    SOUND_DIE: 1,
    SOUND_WIN: 10,
    SOUND_CLIMB: 12,
    context: new AudioContext(),
    currentSounds: [],
    initialize: function() {

        function onLoaded(buffers) {
            SoundManager.context.buffers = buffers;
            SoundManager.play(SoundManager.SOUND_INTRO);
        }

        var loader = new BufferLoader(SoundManager.context, [
            'sounds/bacmusic.wav',      // 0
            'sounds/death.wav',         // 1
            'sounds/hammer.wav',        // 2
            'sounds/howhigh.wav',       // 3
            'sounds/intro1_long.wav',   // 4
            'sounds/intro1.wav',        // 5
            'sounds/itemget.wav',       // 6
            'sounds/jump.wav',          // 7
            'sounds/jumpbar.wav',       // 8
            'sounds/walking.wav',       // 9
            'sounds/win1.wav',          // 10
            'sounds/win2.wav',          // 11
            'sounds/climb.wav'          // 12
        ], onLoaded);
        loader.load();
    },
    resetSound: function(soundIndex) {
        var i = 0;
        for(i; i < SoundManager.currentSounds.length; i++) {
            if(SoundManager.currentSounds[i].soundIndex === soundIndex) {
                console.log('deleting sound...');
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

SoundManager.initialize();