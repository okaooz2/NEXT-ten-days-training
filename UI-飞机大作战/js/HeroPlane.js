/****
 * 主角飞机
 * **/


function HeroPlane() {
    //继承飞机类的私有属性
    Plane.call(this, 0, (parameter.canvas.width - parameter.hero_width)/2, parameter.canvas.height - parameter.hero_height, 10);   //暂且设置血量为10
    //弹匣
    this.bullets = [];
    this.hero_interval = [];
}
//继承飞机类的共有属性和方法
inheritPrototype(HeroPlane, Plane);
//初始化费解属性
HeroPlane.prototype.iniHeroPlane = function() {
    this.iniProtoPlane(parameter.hero_image, parameter.hero_width, parameter.hero_height, parameter.hero_bombingImg, parameter.hero_bombingImg_sideLen);
}
//重写更新自身状态的方法
HeroPlane.prototype.updataCondition = function(enemise) {
    var that = this;
    function _updataCondition() {
        for(var i=0, len=enemise.enemy_planes.length; i<len; ++i) {
            if(that.x - enemise.enemy_planes[i].x < enemise.enemy_planes[i].image_width
            && enemise.enemy_planes[i].x - that.x < that.image_width 
            && that.y - enemise.enemy_planes[i].y < enemise.enemy_planes[i].image_height
            && enemise.enemy_planes[i].y - that.y < that.image_height) {
                //先结束飞行状态
                that.stopFlying();
                //**** 因为在此显示爆炸图片效果不理想，因而转到GlobaProgress类的gameover函数下实现 *****/
                //在飞机中心显示爆炸图片一段时间，期间不移动
                // var bombing_x = that.x + 0.5*(that.image_width - that.bombingImg_sideLen);
                // var bombing_y = that.y + 0.5*(that.image_height - that.bombingImg_sideLen);
                // parameter.context.drawImage(that.bombingImg, bombing_x, bombing_y, that.bombingImg_sideLen, that.bombingImg_sideLen);
                parameter.gameover = true;
            }
        }
    }
    this.hero_interval.push(window.setInterval(_updataCondition, 50));
}
//移动飞机的方法
HeroPlane.prototype.moveHeroPlane = function() {
    var that = this;
    var is_touching = false;
    var x_edge = parameter.canvas.width - this.image_width;
    var y_edge = parameter.canvas.height - this.image_height;
    //回调函数加上名字便于移除
    parameter.canvas.addEventListener("touchstart", function moving() {
        var touch_x = event.touches[0].clientX;
        var touch_y = event.touches[0].clientY;
        if(touch_x > that.x && touch_y > that.y &&
        touch_x - that.x < that.image_width && touch_y - that.y < that.image_height) {
            is_touching = true;
        }
    }, false);
    //回调函数加上名字便于移除
    parameter.canvas.addEventListener("touchend", function moving() {
        is_touching = false;
    }, false);
    //回调函数加上名字便于移除
    parameter.canvas.addEventListener("touchmove", function moving(event){
        event.preventDefault();
        if(is_touching) {
            var position_x = event.touches[0].clientX - that.image_width/2;
            var position_y = event.touches[0].clientY - that.image_height/2;
            if(position_x > x_edge) {
                that.x =  x_edge;
            }
            else if(position_x < 0) {
                that.x = 0;
            }
            else {
                 that.x = position_x;
            }

            if(position_y > y_edge) {
                that.y = y_edge;
            }
            else if(position_y < 0) {
                that.y = 0;
            }
            else {
                that.y = position_y;
            }
        }
    }, false);
}
//制颗子弹
HeroPlane.prototype.makeBullte = function() {
    var that = this;
    function _makeBullte() {
        var bullet = new Bullet(parameter.bullet_speen, that.x + 0.5*(that.image_width-parameter.bulletImg_width), that.y);
        bullet.iniProto(parameter.bulletImg, parameter.bulletImg_width, parameter.bulletImg_height);
        that.bullets.push(bullet);
    }
    this.hero_interval.push(window.setInterval(_makeBullte, 100));
}
//移除失效子弹
HeroPlane.prototype.removeBullte = function() {
    var that = this;
    function _removeBullte() {
        for(var i=0, len=that.bullets.length; i<len; len=that.bullets.length) {
            if(!that.bullets[i].is_live) {
                that.bullets.splice(i, 1);
            }
            else {
                ++i;
            }
        }
    }
    this.hero_interval.push(window.setInterval(_removeBullte, 20));
}
//激活子弹的伤害效果
HeroPlane.prototype.hitOther = function(enemise) {
    var that = this;
    function _hitOther() {
        for(var i=0, len=that.bullets.length; i<len; ++i) {
            that.bullets[i].hitOther(enemise);
        }
    }
    this.hero_interval.push(window.setInterval(_hitOther, 20));
}
//让子弹飞
HeroPlane.prototype.letBulletFly = function() {
    for(var i=0, len=this.bullets.length; i<len; ++i) {
        this.bullets[i].drawFlying();
    }
}