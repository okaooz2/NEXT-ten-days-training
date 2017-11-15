/****
 * 敌人飞机类
 * **/
function EnemyPlane() {
    //敌人飞机的集合
    this.enemy_planes = new Array();
    this.interval = [];       //[0]保存内makeEnemy的定时器，[1]保存EnemyPlane内的定时器，[3]保存内的定时器
}
//随机生成敌人飞机
EnemyPlane.prototype = {
    makeEnemy: function() {
        var that = this;
        function _makeEnemy() {
            // for(var i=0, len=that.enemy_planes.length; i<len; ++i, len=that.enemy_planes.length) {
            //     if(!that.enemy_planes[i].is_live) {
            //         //删除一项
            //         that.enemy_planes.splice(i, 1);
            //         --i;
            //     }
            // }
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
        this.interval[0] = window.setInterval(_makeEnemy, 500);
   },
   //让所有敌机动态飞行
   makeEnemyFly: function() {
    //    var that = this;
    //    function _makeEnemyFly() {
        //    parameter.context.clearRect(0, 0, parameter.canvas.width, parameter.canvas.height);
           for(var i=0, len=this.enemy_planes.length; i<len; ++i) {
               this.enemy_planes[i].drawFlying();
               this.enemy_planes[i].judegCondition();
           }
    //    }
    //    this.interval[1] = window.setInterval(_makeEnemyFly, 20);
   },
   //自动删除死亡的敌机（出界 + 被击杀）
   removeEnemy: function() {
       var that = this;
        function _removeEnemy() {
            for(var i=0, len=that.enemy_planes.length; i<len; len=that.enemy_planes.length) {
                if(!that.enemy_planes[i].is_live) {
                    //删除一项
                    that.enemy_planes.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
        }
        //此处定时器决定爆炸画面持续时间
        this.interval[2] = window.setInterval(_removeEnemy, 200);
   }
}
