/****************
 * 飞行对象和飞机对象
 * **************/

//飞行对象
function Fly(speed, x, y, Img_src, width, height) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.width = width;
    this.height = height;
    
    this.image.src = Img_src;
}
Fly.prototype = {
    display: function() {
        var that = this;
        this.image.addEventListener("load", function(event) {
            parameter.context.drawImage(that.image, that.x, that.y, that.width, that.height);
        }, false);
    }
}