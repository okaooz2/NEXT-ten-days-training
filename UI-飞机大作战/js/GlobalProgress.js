/****
 * 控制全局流程的对象
 * **/

function GlobalProgress() {
    this.global_interval = [];
}
GlobalProgress.prototype = {
    /****
     * 处理菜单页面间跳转的方法
     * **/
    menuPanel: function() {
        //获取四个菜单元素
        var welcom_menu = document.querySelector("div#welcom-menu");
        var direction = document.querySelector("div#direction");
        var setting = document.querySelector("div#setting");
        var gameover = document.querySelector("div#gameover");
        //获取欢迎界面的三个按钮
        var welcome_btn_start = welcom_menu.querySelectorAll("button")[0];
        var welcome_btn_setting = welcom_menu.querySelectorAll("button")[1];
        var welcome_btn_direction = welcom_menu.querySelectorAll("button")[2];
        //获取设置页面按钮
        var setting_btn = setting.querySelector("button");
        //获取说明页面按钮
        var direction_btn = direction.querySelector("button");
        //获取gameover页面按钮
        var gameover_btn = gameover.querySelector("button");
        //获取本元素的指针
        var that = this;

        //进入页面先让欢迎页面显示
        welcom_menu.style.display = "block";
        //绑定欢迎页面开始按钮
        welcome_btn_start.onclick = function() {
            welcom_menu.style.display = "none";
            that.initialData();
            that.gamingProgress();
            document.body.style.backgroundImage = "url(" + parameter.gamingBackgroundImg_2_src + ")";
            parameter.score_panel.style.display = "block";
            parameter.score_panel.innerHTML = parameter.score;
        };
        //绑定欢迎页面设置按钮
        welcome_btn_setting.onclick = function() {
            welcom_menu.style.display = "none";
            setting.style.display = "block";
        };
        //绑定欢迎页面说明按钮
        welcome_btn_direction.onclick = function() {
            welcom_menu.style.display = "none";
            direction.style.display = "block";
        };
        //绑定设置页面确定按钮
        setting_btn.onclick = function() {
            setting.style.display = "none";
            welcom_menu.style.display = "block";
        };
        //绑定说明页面确定按钮
        direction_btn.onclick = function() {
            direction.style.display = "none";
            welcom_menu.style.display = "block";
        };
        //绑定gameover界面按钮
        gameover_btn.onclick = function() {
            parameter.context.clearRect(0, 0, parameter.canvas.width, parameter.canvas.height);
            gameover.style.display = "none";
            welcom_menu.style.display = "block";
            document.body.style.backgroundImage = "url(" + parameter.gamingBackgroundImg_1_src + ")";
            parameter.score_panel.style.display = "none";
        };
    },
    /****
     * 初始化数据的方法
     * **/
    initialData: function() {
        parameter.gameover = false;
        parameter.score = 0;
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
            hero.letBulletFly();
        }
        this.global_interval.push(window.setInterval(_letFly, 20));
    },
    /****
     * 主角飞机死亡时重回主菜单
     * **/
    gameover: function(enemeies, hero) {
        //在飞机中心显示爆炸图片一段时间，期间不移动
        var bombing_x = hero.x + 0.5*(hero.image_width - hero.bombingImg_sideLen);
        var bombing_y = hero.y + 0.5*(hero.image_height - hero.bombingImg_sideLen);
        parameter.context.drawImage(hero.bombingImg, bombing_x, bombing_y, hero.bombingImg_sideLen, hero.bombingImg_sideLen);

        //清除所有引用
        for(var i=0, len=this.global_interval.length; i<len; ++i) {
            window.clearInterval(this.global_interval[i]);
        }
        enemeies.end();
        hero.end();

        //显示gameover界面
        var gameover_menu = document.querySelector("div#gameover");
        var score = gameover_menu.querySelector("span");
        score.innerHTML = parameter.score;
        gameover_menu.style.display = "block";
        enemeies = null;
        hero = null;
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
        hero.makeBullte();
        hero.removeBullte();
        hero.hitOther(enemeies);
        hero.updataCondition(enemeies);

        this.letFly(enemeies, hero);

        var that = this;
        function _gameover() {
            if(parameter.gameover) {
                that.gameover(enemeies, hero);
            }
        }
        this.global_interval.push(window.setInterval(_gameover, 200));
    }
}