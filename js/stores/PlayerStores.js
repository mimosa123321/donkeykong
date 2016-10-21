const PlayerStores = {
    bodyWidth: 21,
    bodyHeight: 41,
    stepDistance: 1,
    jumpDistance: 40,
    currentLevel: 0,
    isDie: false,
    isWin: false,
    totalLife : 3,
    getHammer: false,
    spriteFrames: {
        normal: {
            stand:{
                'right':[{x:141,y:46,width:21,height:42}],
                'left':[{x:141,y:2,width:21,height:42}]
            },
            walk:{
                'right':[{x:71, y:2,width:21,height:39},{x:25, y:2,width:21,height:39}],
                'left':[{x:2, y:2,width:21,height:39},{x:48, y:2,width:21,height:39}]
            },
            jump:{
                'right':[{x:164,y:2,width:39,height:42}],
                'left':[{x:205,y:2,width:39,height:42}]
            },
            climb: [{x:209, y:46,width:23,height:46}],
            die: {
                'right':[{x:164,y:46,width:43,height:42}],
                'left':[{x:96,y:46,width:43,height:42}]
            }
        },
        hammerMode: {
            stand:{
                'right':[{x:2,y:46,width:45,height:42}],
                'left':[{x:246,y:2,width:45,height:42}]
            },
            walk:{
                'right':[{x:340, y:2,width:45,height:42},{x:49, y:46,width:45,height:42}],
                'left':[{x:293, y:2,width:45,height:42},{x:94, y:2,width:45,height:42}]
            },
            jump:{
                'right':[{x:2,y:117,width:77,height:69}],
                'left':[{x:271,y:46,width:77,height:69}]
            },
            beat:{
                'right':[{x:2,y:73,width:77,height:69},{x:397,y:73,width:77,height:69},{x:2,y:144,width:77,height:69}],
                'left':[{x:239,y:144,width:77,height:69},{x:239,y:73,width:77,height:69},{x:160,y:73,width:77,height:69}]
            },
            climb: [{x:140, y:2,width:23,height:46}],
            die: {
                'right':[{x:292,y:2,width:43,height:42}],
                'left':[{x:247,y:2,width:43,height:42}]
            }
        }

    }
};
