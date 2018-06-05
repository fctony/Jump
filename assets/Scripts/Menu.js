
cc.Class({
    extends: cc.Component,

    properties: {
        startMus:{
            default:null,
            url:cc.AudioClip
        }

    },

    onload:function(){
        cc.audioEngine.play(this.startMus,false,1);
    },

    StartGame:function(){
        cc.director.loadScene("Game");
    }
});
