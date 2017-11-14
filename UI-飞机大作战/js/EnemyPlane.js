/****
 * 敌人飞机类
 * **/
function EnemyPlane(speed, x, y, blood) {
    //敌人飞机的集合
    this.enemy_planes = new Array();
    this.interval = null;
}
//随机生成敌人飞机
EnemyPlane.prototype = {
    makeEnemy: function() {
        var that = this;
        function _makeEnemy() {
            for(var i=0, len=that.enemy_planes.length; i<len; ++i, len=that.enemy_planes.length) {
                if(!that.enemy_planes[i].is_live) {
                    //删除一项
                    that.enemy_planes.splice(i, 1);
                    --i;
                }
            }
            if(that.enemy_planes.length >= parameter.enemy_maxNum) {
                return ;
            }
        
            var length = that.enemy_planes.length;
            that.enemy_planes[length] = new Plane()
            if(Math.random() > 0.15) {
                //添加小飞机
                var x = Math.floor(Math.random()*(parameter.canvas.width - parameter.enemy_small_width));
                that.enemy_planes[length] = new Plane(parameter.enemy_small_speed, x, 0, parameter.enemy_small_blood);
                that.enemy_planes[length].iniProtoPlane(parameter.enemyImg_small, parameter.enemy_small_width, parameter.enemy_small_height, parameter.enemy_small_bombingImg, parameter.enemy_small_bombingImg_sideLen);
            }
            else {
                var x = Math.floor(Math.random()*(parameter.canvas.width - parameter.enemy_big_width));
                that.enemy_planes[length] = new Plane(parameter.enemy_big_speed, x, 0, parameter.enemy_big_blood);
                that.enemy_planes[length].iniProtoPlane(parameter.enemyImg_big, parameter.enemy_big_width, parameter.enemy_big_height, parameter.enemy_big_bombingImg, parameter.enemy_big_bombingImg_sideLen);
            }
        }
        this.enemyPlane_Interval = window.setInterval(_makeEnemy, 500);
   },
   //让所有敌机动态飞行
   makeEnemyFly: function() {
       var that = this;
       function _makeEnemyFly() {
           parameter.context.clearRect(0, 0, parameter.canvas.width, parameter.canvas.height);
           for(var i=0, len=that.enemy_planes.length; i<len; ++i) {
               that.enemy_planes[i].drawFlying();
               that.enemy_planes[i].judegCondition();
           }
       }
       that.interval = window.setInterval(_makeEnemyFly, 20);
   }
}
