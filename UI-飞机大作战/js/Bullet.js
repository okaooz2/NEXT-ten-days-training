/****
 * 子弹类
 * **/


function Bullet(speed, x, y) {
    //继承飞行类的私有属性
    Fly.call(this, speed, x, y);//////////////////////////
    //新增属性
    // this.condition = "normal";      //normal: 正常状态, disappear: 消失（直接消失）
}
//继承飞行类的共有属性
inheritPrototype(Bullet, Fly);
//击伤敌机的方法（子弹直接消失） + 到达边界消失
Bullet.prototype.hitOther = function(enemise) {
    for(var i=0, len=enemise.enemy_planes.length; i<len; ++i) {
        if(this.x - enemise.enemy_planes[i].x < enemise.enemy_planes[i].image_width
        && enemise.enemy_planes[i].x - this.x < this.image_width 
        && this.y - enemise.enemy_planes[i].y < enemise.enemy_planes[i].image_height
        && enemise.enemy_planes[i].y - this.y < this.image_height) {
            this.stopFlying();
            --enemise.enemy_planes[i].blood;
        }
        if(this.y < 0) {
            this.is_live = false;
        }
    }
}