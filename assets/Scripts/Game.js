

cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default:null,
            type:cc.Node
        },

        block_pre:{
            default:[],
            type:cc.Prefab
        },

        //预制体父节点
        blockRoot:{
            default:null,
            type:cc.Node
        },

        //定义原点
        left_Org:cc.p(0,0),

        mapRoot:{
            default:null,
            type:cc.Node
        },
        //y相对于x轴的比例
        y_ratio:0.5560472,

        checkOutImg:{
            default:null,
            type:cc.Node
        },



        blockZOrder:-1,

    },



    start () {
        //随机生成一个预制体（当前块）
        this.cur_block=cc.instantiate(this.block_pre[Math.floor(Math.random()*3)]);
        this.blockRoot.addChild(this.cur_block);
        this.cur_block.setPosition(this.blockRoot.convertToNodeSpaceAR(this.left_Org));

        var w_pos=this.cur_block.getChildByName("Mid").convertToWorldSpaceAR(cc.p(0,0));
        this.player.setPosition(this.mapRoot.convertToNodeSpaceAR(w_pos));
        this.next_block=this.cur_block;
        this.playerCom=this.player.getComponent("Player");


        this.addBlock();
    },
    //添加下一个块
    addBlock:function(){
        this.cur_block=this.next_block;
        this.next_block=cc.instantiate(this.block_pre[Math.floor(Math.random()*3)]);
        this.blockRoot.addChild(this.next_block);
        this.next_block.setLocalZOrder(this.blockZOrder);
        this.blockZOrder--;

        //获得对齐位置
        var x_distance = 200+Math.random()*200;
        var y_distance = x_distance*this.y_ratio;
        var next_pos = this.cur_block.getPosition();
        next_pos.x += (x_distance * this.playerCom.direction);
        next_pos.y += y_distance;
        this.next_block.setPosition(next_pos);

        this.playerCom.setNextBlock(this.next_block.getComponent("Block"));



    },

    //移动画布
    moveMap:function(offset_x,offset_y){

        var m1=cc.moveBy(0.5,offset_x,offset_y);
        var endFunc=cc.callFunc(function(){
            this.addBlock();
        }.bind(this));
        var seq=cc.sequence([m1,endFunc]);
        this.mapRoot.runAction(seq);

    },


    onCheckOutGame:function(){
        this.checkOutImg.active=true;
    },

    restart:function(){
        cc.director.loadScene("Game");
    }




});
