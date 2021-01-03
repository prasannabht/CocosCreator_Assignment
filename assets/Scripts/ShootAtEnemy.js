
cc.Class({
    extends: cc.Component,
    
    properties: {
        button: {
            default: null,
            type: cc.Button
        },

        player: {
            default: null,
            type: cc.Node
        },

        target: {
            default: null,
            type: cc.Node
        },

    },

    onLoad: function () {
        //button click
        this.button.node.on('click', this.callback, this);
         
    },


    callback: function(button){
        
        console.log("Button pressed");
        
        var diffX = this.target.position.x - this.player.position.x;
        var diffY = this.target.position.y - this.player.position.y;
            
        var angle = Math.atan2(diffX, diffY);
        var angleDeg = cc.radiansToDegrees(angle);

        var rotate_Action = cc.rotateTo(1, angleDeg);
        this.player.runAction(rotate_Action)
    },


    update: function (dt) {
        //rotate shooter
        

    },
});