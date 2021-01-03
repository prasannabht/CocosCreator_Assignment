
cc.Class({
    extends: cc.Component,

    
    properties: {
        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },

        maxEnemyCount: 5,

        ground: {
            default: null,
            type: cc.Node
        },
        enemies: [],

        //
        button: {
            default: null,
            type: cc.Button
        },

        player: {
            default: null,
            type: cc.Node
        },

        bullet: {
            default: null,
            type: cc.Prefab
        },

        congratsScreen: {
            default: null,
            type: cc.Prefab
        }
        
    },

    onLoad: function(){
        //this.groundY = this.ground.y + this.ground.height/2;
        this.groundY = this.ground.y + 80;

        //get min and max x and y
        var maxX = this.node.position.x + this.node.width/2 - 180;
        var maxY = this.node.position.y + this.node.height/2 + this.groundY;

        for(var i = 0; i<this.maxEnemyCount; i++){
            var newEnemy = cc.instantiate(this.enemyPrefab);
            this.node.addChild(newEnemy);
    
            //get random co ordinates
            var randX = 0;
            var randY = 0;
            
            randX = (Math.random() - 0.5) * 2 * maxX;
            //randY = (Math.random() - 0.5) * 2 * maxY;
            randY = (Math.random() - 0.5) * 2 * maxY - this.groundY;
            //
            //set position of new Enemy
            newEnemy.setPosition(cc.v2(randX,randY));
            this.enemies.push(newEnemy);
            
        }
        
        //button click
        this.button.node.on('click', this.callback, this);
    },

    spawnEnemy: function(){
        var newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);

        //get max x and y
        var maxX = this.node.width/2;
        var maxY = this.node.height/2;

        //get random co ordinates
        var randX = 0;
        var randY = 0;

        randX = (Math.random() - 0.5) * 2 * maxX;
        randY = this.groundY + Math.random() * maxY;
        //set position of new Enemy
        newEnemy.setPosition(cc.v2(randX,randY))

    },

    callback: function(button){
        
        console.log("Button pressed");
        
        this.killClosestEnemy();


    },

    killClosestEnemy: function(){
        
        var minDistEnemyIndex = 0;
        var minDist = 1000;
        //if no elements in enemies array, show congrats message
        if(this.enemies.length == 0){
            console.log("Nothing to show here");
        } else{
            for(var i = 0; i<this.enemies.length; i++){
                //var diff = (this.enemies[i].position - this.player.position);
                var playerPos = this.player.getPosition();
                var targetPos = this.enemies[i].getPosition();
                var dist = playerPos.sub(targetPos).mag();
                //var dist = playerPos.sub(this.enemies[i].position).mag();
    
                if (dist <= minDist){
                    minDist = dist;
                    minDistEnemyIndex = i;
                }
            }
    
            var diffX = this.enemies[minDistEnemyIndex].position.x - this.player.position.x;
            var diffY = this.enemies[minDistEnemyIndex].position.y - this.player.position.y;
                
            var angle = Math.atan2(diffX, diffY);
            var angleDeg = cc.misc.radiansToDegrees(angle);
    
            var rotate_Action = cc.rotateTo(0.5, angleDeg);
            this.player.runAction(rotate_Action);
            
            //Delay action
            var delayAction = new cc.DelayTime(0.5);
            
    
            //shoot bullet
            var newBullet = cc.instantiate(this.bullet);
            newBullet.setPosition(this.player.position.x, this.player.position.y + 10);
            this.node.addChild(newBullet);
    
            var shoot_Action = cc.moveTo(0.4, cc.v2(this.enemies[minDistEnemyIndex].position.x, this.enemies[minDistEnemyIndex].position.y));
            
            var destruction = cc.callFunc(function(){
                newBullet.destroy();
            },this);
    
            var sequence = cc.sequence(delayAction, shoot_Action,destruction);
            newBullet.runAction(sequence);
    
            //remove closest enemy from array
            this.enemies.splice(minDistEnemyIndex,1);
            
            if(this.enemies.length == 0){
                
                this.scheduleOnce(function () {
                    var newCongratsScreen = cc.instantiate(this.congratsScreen);
                    this.node.addChild(newCongratsScreen);
                }, 3);
            }
        }

    }

    // update (dt) {},
});
