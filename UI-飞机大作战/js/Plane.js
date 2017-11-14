/****
 * 飞机对象
 * **/

function Plane(speed, x, y, blood) {
    //继承飞行类的私有属性
    Fly.call(this, speed, x, y);
    //飞机对象的私有属性
    this.condition = "normal";     //normal: 正常状态, bombing: 正在爆炸中(爆炸完后消失), disappear: 消失（直接消失）
    this.blood = blood;
}
//继承飞行类的共享属性和方法
inheritPrototype(Plane, Fly);
//共享属性
Plane.prototype.bombingImg = null;
Plane.prototype.bombingImg_sideLen = 0;
//更新共享属性的方法
Plane.prototype.iniProtoPlane = function(image, image_width, image_height, bombingImg, bombingImg_sideLen) {
    this.iniProto(image, image_width, image_height);
    this.bombingImg = bombingImg;
    this.bombingImg_sideLen = bombingImg_sideLen;
}
//判断飞机当前状态的方法
Plane.prototype.judegCondition = function() {
    // var that = this;
    // function _judegCondition() {
        if(this.blood <= 0 || this.y>300) {
            this.condition = "bombing";
            this.updataCondition();
            // clearInterval(interval);
        }
        else if(this.y > parameter.canvas.height) {
            this.condition = "disappear";
            this.updataCondition();
            // clearInterval(interval);
        }
    // }
    // var interval = window.setInterval(_judegCondition, 10);
}
//更新自身状态的方法
Plane.prototype.updataCondition = function(){
    switch(this.condition) {
        // case "normal": 
        //     this.drawFlying();
        //     break;
        case "bombing": 
            //先结束飞行状态
            this.stopFlying();
            //在飞机中心显示爆炸图片一段时间，期间不移动
            var bombing_x = this.x + 0.5*(this.image_width - this.bombingImg_sideLen);
            var bombing_y = this.y + 0.5*(this.image_height - this.bombingImg_sideLen);
            parameter.context.drawImage(this.bombingImg, bombing_x, bombing_y, this.bombingImg_sideLen, this.bombingImg_sideLen);
            var that = this;
            // var interval = window.setTimeout(function() {
            //     parameter.context.clearRect(bombing_x, bombing_y, that.bombingImg_sideLen, that.bombingImg_sideLen);
            // }, 1);
            // window.setTimeout(function() {
            //     clearInterval(interval);
            // }, 30);
            break;
        case "disappear": 
            //结束飞行状态
            this.stopFlying();
            break;
        default: 
            break;
    }
}