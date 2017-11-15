/****
 * 主角飞机
 * **/


function HeroPlane() {
    //继承飞机类的私有属性
    Plane(0, (parameter.canvas.width - parameter.hero_width)/2, parameter.canvas.hero_width - parameter.hero_height, 10);   //暂且设置血量为10
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
    //回调函数加上名字便于移除
    document.body.addEventListener("touchstart"&&"touchmove", function moving(event){
        // event.preventDefault();
        //触摸到飞机移动才有效
        if(Math.abs(event.touches[0].clientX - that.x) < that.width && 
        Math.abs(event.touches[0].clientY - that.y) < that.hero_image) {
            return ;
        }
        that.x = event.touches[0].clientX;
        that.y = event.touches[0].clientY;
        // circle.style.left = event.touches[0].clientX + "px";
        // circle.style.top = event.touches[0].clientY + "px";
        // circle_position.innerHTML = "position: (" + event.changedTouches[0].clientX + ", " + event.changedTouches[0].clientY + ")";
    }, false);
}



// this.iniProtoPlane(parameter.hero_image, parameter.hero_width, parameter.hero_height, parameter.hero_bombingImg, parameter.hero_bombingImg_sideLen);