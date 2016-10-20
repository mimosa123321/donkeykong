var DonkeyStores = {
    pos: {
        x:0,
        y:0
    },
    throwDirection: "left",
    isThrow: false,
    spriteFrames: {
        beat:[{x:2, y:2,width:69,height:48}, {x:73, y:2,width:60,height:48}, {x:135, y:2,width:69,height:48}],
        stand: [{x:273, y:2,width:60,height:48}],
        throw:{
            'left':[{x:206,y:2,width:65,height:48}],
            'right':[{x:335,y:2,width:64,height:48}]
        },
        win: [{x:2, y:2,width:69,height:48}, {x:73, y:2,width:60,height:48}],
        dead:[{x:401, y:2,width:60,height:48}, {x:463, y:2,width:69,height:48}, {x:534, y:2,width:71,height:48}]
    }
};
