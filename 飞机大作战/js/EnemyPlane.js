/****
 * 敌人飞机类
 * **/
function EnemyPlane() {
    //敌人飞机的集合
    this.enemy_planes = new Array();
    this.enemy_interval = [];       //[0]保存内makeEnemy的定时器，[1]保存removeEnemy内的定时器
}
//随机生成敌人飞机
EnemyPlane.prototype = {
    makeEnemy: function() {
        var that = this;
        function _makeEnemy() {
            if(that.enemy_planes.length >= parameter.enemy_maxNum) {
                return ;
            }
        
            var length = that.enemy_planes.length;
            that.enemy_planes[length] = new Plane()
            if(Math.random() > 0.2) {
                //添加小飞机
                that.enemy_planes[length] = new Plane(parameter.enemy_small_speed, 
                Math.floor(Math.random()*(parameter.canvas.width - parameter.enemy_small_width)), 
                -parameter.enemy_small_height, parameter.enemy_small_blood);
                that.enemy_planes[length].iniProtoPlane(parameter.enemyImg_small, parameter.enemy_small_width, parameter.enemy_small_height, parameter.enemy_small_bombingImg, parameter.enemy_small_bombingImg_sideLen);
            }
            else {
                that.enemy_planes[length] = new Plane(parameter.enemy_big_speed, 
                    Math.floor(Math.random()*(parameter.canvas.width - parameter.enemy_big_width)), 
                    -parameter.enemy_big_height, parameter.enemy_big_blood);
                that.enemy_planes[length].iniProtoPlane(parameter.enemyImg_big, parameter.enemy_big_width, parameter.enemy_big_height, parameter.enemy_big_bombingImg, parameter.enemy_big_bombingImg_sideLen);
            }
        }
        this.enemy_interval.push(window.setInterval(_makeEnemy, 100));
    },
   //让所有敌机动态飞行
    makeEnemyFly: function() {
        for(var i=0, len=this.enemy_planes.length; i<len; ++i) {
            this.enemy_planes[i].drawFlying();
            this.enemy_planes[i].judegCondition();
        }
    },
    //自动删除死亡的敌机（出界 + 被击杀）
    removeEnemy: function() {
        var that = this;
        function _removeEnemy() {
            for(var i=0, len=that.enemy_planes.length; i<len; len=that.enemy_planes.length) {
                if(!that.enemy_planes[i].is_live) {
                    //加分
                    if(that.enemy_planes[i].blood <= 0) {
                        if(that.enemy_planes[i].image === parameter.enemyImg_small) {   //小飞机
                            parameter.score += parameter.enemy_small_value;
                        }
                        else {
                            parameter.score += parameter.enemy_big_value;
                        }
                    }
                    parameter.score_panel.innerHTML = parameter.score;
                    //删除一项
                    that.enemy_planes.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
        }
        //此处定时器决定爆炸画面持续时间
        this.enemy_interval.push(window.setInterval(_removeEnemy, 200));
    },
    //删除类中残余的引用
    end: function() {
        for(var i=0, len=this.enemy_interval.length; i<len; ++i) {
            window.clearInterval(this.enemy_interval[i]);
        }
    }
}
