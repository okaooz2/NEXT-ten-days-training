/****
 * 主角飞机
 * **/


function HeroPlane() {
    //继承飞机类的私有属性
    Plane.call(this, 0, (parameter.canvas.width - parameter.hero_width)/2, parameter.canvas.height - parameter.hero_height, 10);   //暂且设置血量为10
}
//继承飞机类的共有属性和方法
inheritPrototype(HeroPlane, Plane);
//初始化费解属性
HeroPlane.prototype.iniHeroPlane = function() {
    this.iniProtoPlane(parameter.hero_image, parameter.hero_width, parameter.hero_height, parameter.hero_bombingImg, parameter.hero_bombingImg_sideLen);
}
//重写更新自身状态的方法
HeroPlane.prototype.updataCondition = function() {
    if(this.condition = "bombing") {
        //擦除飞机
        parameter.context.clearRect(this.x, this.y, this.width, this.hero_height);
        //添加爆炸效果
        var bombing_x = this.x + 0.5*(this.image_width - this.bombingImg_sideLen);
        var bombing_y = this.y + 0.5*(this.image_height - this.bombingImg_sideLen);
        parameter.context.drawImage(this.bombingImg, bombing_x, bombing_y, this.bombingImg_sideLen, this.bombingImg_sideLen);
    }
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



// this.iniProtoPlane(parameter.hero_image, parameter.hero_width, parameter.hero_height, parameter.hero_bombingImg, parameter.hero_bombingImg_sideLen);