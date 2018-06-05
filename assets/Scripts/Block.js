

cc.Class({
    extends: cc.Component,

    properties: {

    },



    start () {
        this.mid=this.node.getChildByName("Mid");
        this.up=this.node.getChildByName("Up");
        this.down=this.node.getChildByName("Down");

        this.left=this.node.getChildByName("Left");
        this.right=this.node.getChildByName("Right");
    },

    //dir为1往右跳，为-1往左跳
    jumpOnBlock:function(w_dst_pos,direction){
        var mid_pos=this.mid.convertToWorldSpaceAR(cc.p(0,0));
        //取得当前坐标与原点的距离
        var dir=cc.pSub(w_dst_pos,mid_pos);
        var min_len=cc.pLength(dir);
        var min_pos=mid_pos;
        if(direction===1){
            var up_pos=this.up.convertToWorldSpaceAR(cc.p(0,0));
            //找到最近的参考点
            dir=cc.pSub(w_dst_pos,up_pos);
            var len=cc.pLength(dir);
            if(min_len>len){
                min_len=len;
                min_pos=up_pos;
            }
            var down_pos=this.down.convertToWorldSpaceAR(cc.p(0,0));
            dir=cc.pSub(w_dst_pos,down_pos);
            var len=cc.pLength(dir);
            if(min_len>len){
                min_len=len;
                min_pos=down_pos;
            }
        }
        else{
            var left_pos=this.left.convertToWorldSpaceAR(cc.p(0,0));
            dir=cc.pSub(w_dst_pos,left_pos);
            var len=cc.pLength(dir);
            if(min_len>len){
                min_len=len;
                min_pos=left_pos;
            }
            var right_pos=this.right.convertToWorldSpaceAR(cc.p(0,0));
            dir=cc.pSub(w_dst_pos,right_pos);
            var len=cc.pLength(dir);
            if(min_len>len){
                min_len=len;
                min_pos=right_pos;
            }            
        }

        //找到了跳跃位置距离参考点最近的那个参考点以及位置
        dir=cc.pSub(w_dst_pos,min_pos);
        var len=cc.pLength(dir);
        if(len<100){
            w_dst_pos.x=min_pos.x;
            w_dst_pos.y=min_pos.y;
            return true;

        }

        return false;

    }
});
