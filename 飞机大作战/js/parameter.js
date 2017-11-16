/**********
 * 存储全局参数的对象
 * ********/

var parameter = {
    //背景图片
    gamingBackgroundImg_1_src: "../image/背景2.jpg",
    gamingBackgroundImg_2_src: "../image/背景3.jpg",
    //主角飞机的参数
    heroImg_src: "../飞机游戏素材/飞机/飞机1.png",
    hero_image: new Image(),
    hero_width: 80,
    hero_height: 60,
    hero_bombingImg_src: "../飞机游戏素材/爆炸/主角飞机爆炸.png",
    hero_bombingImg: new Image(),
    hero_bombingImg_sideLen: 80,
    //小敌人飞机的参数
    enemyImg_small_src: "../飞机游戏素材/飞机/飞机4.png",
    enemyImg_small: new Image(),
    enemy_small_width: 60,
    enemy_small_height: 45,
    enemy_small_bombingImg_src: "../飞机游戏素材/爆炸/敌机爆炸1.png",
    enemy_small_bombingImg: new Image(),
    enemy_small_bombingImg_sideLen: 30,
    enemy_small_speed: 2.5,
    enemy_small_blood: 1,
    enemy_small_value: 100,
    //大敌人飞机的参数
    enemyImg_big_src: "../飞机游戏素材/飞机/飞机5.png",
    enemyImg_big: new Image(),
    enemy_big_width: 110,
    enemy_big_height: 80,
    enemy_big_bombingImg_src: "../飞机游戏素材/爆炸/敌机爆炸2.png",
    enemy_big_bombingImg: new Image(),
    enemy_big_bombingImg_sideLen: 50,
    enemy_big_speed: 1.5,
    enemy_big_blood: 4,
    enemy_big_value: 500,
    //敌人飞机数量
    enemy_maxNum: 2,
    //子弹的参数
    bulletImg: new Image(),
    bulletImg_src: "../飞机游戏素材/子弹/子弹3.png",
    bulletImg_width: 15,
    bulletImg_height: 30,
    bullet_speen: -20,

    canvas: null,
    context: null,
    gameover: false,
    score: 0,
    score_panel: document.querySelector("#score-panel"),

    initialData: function() {
        //初始化图片
        this.hero_image.src = this.heroImg_src;
        this.enemyImg_small.src = this.enemyImg_small_src;
        this.enemyImg_big.src = this.enemyImg_big_src;
        this.hero_bombingImg.src = this.hero_bombingImg_src;
        this.enemy_small_bombingImg.src = this.enemy_small_bombingImg_src;
        this.enemy_big_bombingImg.src = this.enemy_big_bombingImg_src;
        this.bulletImg.src = this.bulletImg_src;

        //根据设置页面的取值来修改默认设置
        this.canvas =document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        //画布大小与屏幕一样
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;

        document.body.appendChild(this.canvas);
        //====================================
    },
    //重置难度
    resizeDifficulty: function() {
        this.gameover = false;
        this.score = 0;
        this.enemy_maxNum = 2;
        this.enemy_small_speed = 2.5;
        this.enemy_big_speed = 1.5;
    }
};


//这里直接调用函数初始化数据
parameter.initialData();