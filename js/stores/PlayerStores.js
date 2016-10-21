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
                'right':[{x:2,y:2,width:21,height:42}],
                'left':[{x:93,y:180,width:21,height:42}]
            },
            walk:{
                'right':[{x:2, y:113,width:21,height:39},{x:70, y:180,width:21,height:39}],
                'left':[{x:116, y:180,width:21,height:39},{x:139, y:180,width:21,height:39}]
            },
            jump:{
                'right':[{x:162,y:180,width:39,height:42}],
                'left':[{x:203,y:180,width:39,height:42}]
            },
            climb: [{x:244, y:180,width:23,height:46}],
            die: {
                'right':[{x:25,y:2,width:43,height:42}],
                'left':[{x:70,y:2,width:43,height:42}]
            }
        },
        hammerMode: {
            stand:{
                'right':[{x:115,y:2,width:45,height:42}],
                'left':[{x:215,y:46,width:45,height:42}]
            },
            walk:{
                'right':[{x:162, y:2,width:45,height:42},{x:209, y:2,width:45,height:42}],
                'left':[{x:25, y:113,width:45,height:42},{x:72, y:113,width:45,height:42}]
            },
            jump:{
                'right':[{x:147,y:46,width:66,height:43}],
                'left':[{x:2,y:180,width:66,height:43}]
            },
            beat:{
                'right':[{x:2,y:46,width:32,height:63},{x:36,y:46,width:51,height:64},{x:89,y:46,width:56,height:65}],
                'left':[{x:119,y:113,width:32,height:63},{x:153,y:113,width:51,height:64},{x:206,y:113,width:56,height:65}]
            },
            climb: [{x:244, y:180,width:23,height:46}],
            die: {
                'right':[{x:25,y:2,width:43,height:42}],
                'left':[{x:70,y:2,width:43,height:42}]
            }
        }

    }
};
