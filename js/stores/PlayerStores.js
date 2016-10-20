const PlayerStores = {
    bodyWidth: 21,
    bodyHeight: 41,
    stepDistance: 1,
    jumpDistance: 40,
    currentLevel: 0,
    isDie: false,
    isWin: false,
    spriteFrames: {
        stand:{
            'right':[{x:2,y:2,width:21,height:42}],
            'left':[{x:161,y:3,width:21,height:42}]
        },
        walk:{
            'right':[{x:115, y:2,width:21,height:39},{x:138, y:2,width:21,height:39}],
            'left':[{x:184, y:2,width:21,height:39},{x:207, y:2,width:21,height:39}]
        },
        jump:{
            'right':[{x:230,y:2,width:39,height:42}],
            'left':[{x:271,y:2,width:39,height:42}]
        },
        climb: [{x:312, y:2,width:23,height:46}],
        die: {
            'right':[{x:25,y:2,width:43,height:42}],
            'left':[{x:70,y:2,width:43,height:42}]
        }
    }
};
