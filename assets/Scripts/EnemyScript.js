// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter(other, self){
        console.log("collided");
        
        var scaleDown_Action = cc.scaleTo(2, 0, 0);
        
        var destruction = cc.callFunc(function(){
            this.node.destroy();
        },this);

        var sequence = cc.sequence(scaleDown_Action,destruction);
        this.node.runAction(sequence);
    },

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

    },

    start () {

    },

    // update (dt) {},
});
