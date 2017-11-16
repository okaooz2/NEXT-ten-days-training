/****************
 * 飞行对象
 * **************/


function Fly(speed, x, y) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.is_live = true;
}
Fly.prototype = {
    image: null,
    image_width: 0,
    image_height: 0,

    //初始化共享属性
    iniProto: function(image, image_width, image_height) {
        //若图片已加载，则不再重复加载
        if(this.image !== null) {
            return ;
        }
        this.image = image;
        this.image_width = image_width;
        this.image_height = image_height;
    },
    //飞行的方法
    drawFlying: function() {
        if(!this.is_live) {
            return ;
        }
        this.y += this.speed;
        parameter.context.drawImage(this.image, this.x, this.y, this.image_width, this.image_height);
    },
    stopFlying: function() {
        this.is_live = false;
    }
}