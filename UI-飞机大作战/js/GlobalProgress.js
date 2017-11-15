/****
 * 控制全局流程的对象
 * **/

function GlobalProgress() {   
}
GlobalProgress.prototype = {
    /****
     * 处理菜单页面间跳转的方法
     * **/
    menuPanel: function() {
        //获取三个菜单元素
        var welcom_menu = document.querySelector("div#welcom-menu");
        var direction = document.querySelector("div#direction");
        var setting = document.querySelector("div#setting");
        //获取欢迎界面的三个按钮
        var welcome_btn_start = welcom_menu.querySelectorAll("button")[0];
        var welcome_btn_setting = welcom_menu.querySelectorAll("button")[1];
        var welcome_btn_direction = welcom_menu.querySelectorAll("button")[2];
        //获取设置页面按钮
        var setting_btn = setting.querySelector("button");
        //获取说明页面按钮
        var direction_btn = direction.querySelector("button");
        //获取本元素的指针
        var that = this;

        //进入页面先让欢迎页面显示
        welcom_menu.style.display = "block";
        //绑定欢迎页面开始按钮
        welcome_btn_start.addEventListener("click", function(event) {
            welcom_menu.style.display = "none";
            that.initialData();
            that.gamingProgress();
        }, false);
        //===========================================
        //绑定欢迎页面设置按钮
        welcome_btn_setting.addEventListener("click", function(event) {
            welcom_menu.style.display = "none";
            setting.style.display = "block";
        }, false);
        //绑定欢迎页面说明按钮
        welcome_btn_direction.addEventListener("click", function(event) {
            welcom_menu.style.display = "none";
            direction.style.display = "block";
        }, false);
        //绑定设置页面确定按钮
        setting_btn.addEventListener("click", function(event) {
            setting.style.display = "none";
            welcom_menu.style.display = "block";
        }, false);
        //绑定说明页面确定按钮
        direction_btn.addEventListener("click", function(event) {
            direction.style.display = "none";
            welcom_menu.style.display = "block";
        }, false);
    },
    /****
     * 初始化数据的方法
     * **/
    initialData: function() {
        //根据设置页面的取值来修改默认设置
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        parameter.canvas = canvas;
        parameter.context = context;
        //画布大小与屏幕一样
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;

        document.body.appendChild(canvas);
        //====================================
    },
    /****
     * 让所有飞行物飞行的方法
     * **/
    letFly: function(enemeies, hero) {
        //先擦除画布
        function _letFly()　{
            parameter.context.clearRect(0, 0, parameter.canvas.width, parameter.canvas.height);
            enemeies.makeEnemyFly();
            hero.drawFlying();
        }
        window.setInterval(_letFly, 20);
    },
    /****
     * 控制游戏流程的方法
     * **/
    gamingProgress: function() {
        var enemeies = new EnemyPlane();
        enemeies.makeEnemy();
        enemeies.removeEnemy();

        var hero = new HeroPlane();
        hero.iniHeroPlane();
        hero.moveHeroPlane();

        this.letFly(enemeies, hero);
    }
    
}