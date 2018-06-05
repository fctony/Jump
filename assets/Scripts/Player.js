
var Game=require("Game");
cc.Class({
    extends: cc.Component,

    properties: {
        //初始化速度
        init_speed:150,
        //加速度
        a_power:600,
        y_ratio:0.5560472,

        gameManager:{
            default:null,
            type:Game
        },

        jumpMus:{
            default:null,
            url:cc.AudioClip
        },

        dieMus:{
            default:null,
            url:cc.AudioClip
        },

        direction:1,

    },


    onLoad:function(){
        this.next_block=null;
        // var direction=1;  //1，-1
    },

    player_jump:function(){
        var x_distance = this.x_distance * this.direction;
        var y_distance = this.x_distance * this.y_ratio;

        var target_pos=this.node.getPosition();
        target_pos.x+=x_distance;
        target_pos.y+=y_distance;
        //控制主角旋转和跳跃
        this.rot_node.runAction(cc.rotateBy(0.5,360*this.direction));
        var gameOver=false;

        var w_pos=this.node.parent.convertToWorldSpaceAR(target_pos);
        if(this.next_block.jumpOnBlock(w_pos,1)){
            //target_pos转成了目标参考点
            target_pos=this.node.parent.convertToNodeSpaceAR(w_pos);
        }
        else{
            cc.audioEngine.play(this.dieMus,false,1);
            gameOver=true;
        }
        var j=cc.jumpTo(0.5,target_pos,200,1);
        this.direction=(Math.random()<0.5)?-1:1;

        var endFunc=cc.callFunc(function(){
            if(gameOver){
                this.gameManager.onCheckOutGame();

            }
            else{
                if(this.direction===-1){
                    this.gameManager.moveMap(580-w_pos.x,-y_distance);

                }
                else{
                    this.gameManager.moveMap(180-w_pos.x,-y_distance);

                 }
                

            }
            

        }.bind(this));

        
        var seq=cc.sequence(j,endFunc);
        this.node.runAction(seq);
    },


    setNextBlock:function(block){
        this.next_block=block;


    },

    start () {
        
        
        this.rot_node=this.node.getChildByName("Rotate");
        this.anim_node=this.rot_node.getChildByName("anim");
        //表示是否正在蓄力
        this.is_power_mode=false;
        this.speed=0;
        this.x_distance=0;

        this.anim_node.on(cc.Node.EventType.TOUCH_START,function(e){
            this.is_power_mode=true;
            this.x_distance=0;
            this.speed=this.init_speed;
            this.anim_node.stopAllActions();
            this.anim_node.runAction(cc.scaleTo(2,1,0.5));

        }.bind(this),this);

        this.anim_node.on(cc.Node.EventType.TOUCH_END,function(e){
            this.is_power_mode=false;
            this.anim_node.stopAllActions();
            this.anim_node.runAction(cc.scaleTo(0.5,1,1));
            cc.audioEngine.play(this.jumpMus,false,1);
            this.player_jump();
            
        }.bind(this),this);

        this.anim_node.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
            this.is_power_mode=false;
            this.anim_node.stopAllActions();
            this.anim_node.runAction(cc.scaleTo(0.5,1,1));
            cc.audioEngine.play(this.jumpMus,false,1);
            this.player_jump();
            
        }.bind(this),this);

    },

    update:function(dt){
        if(this.is_power_mode){
            this.speed+=this.a_power*dt;
            this.x_distance+=this.speed*dt;

        }

    }


});
