/**********
 * 存储全局参数的对象
 * ********/

var parameter = {
    //背景图片
    gamingBackgroundImg_src: "../image/背景3.jpg",
    //主角飞机的参数
    heroImg_src: "../飞机游戏素材/飞机/飞机1.png",
    hero_image: new Image(),
    hero_width: 80,
    hero_height: 60,
    hero_bombingImg_src: "../飞机游戏素材/爆炸/主角飞机爆炸.png",
    hero_bombingImg: new Image(),
    hero_bombingImg_sideLen: 60,
    //小敌人飞机的参数
    enemyImg_small_src: "../飞机游戏素材/飞机/飞机4.png",
    enemyImg_small: new Image(),
    enemy_small_width: 60,
    enemy_small_height: 45,
    enemy_small_bombingImg_src: "../飞机游戏素材/爆炸/敌机爆炸1.png",
    enemy_small_bombingImg: new Image(),
    enemy_small_bombingImg_sideLen: 30,
    enemy_small_speed: 3,
    enemy_small_blood: 2,
    //大敌人飞机的参数
    enemyImg_big_src: "../飞机游戏素材/飞机/飞机5.png",
    enemyImg_big: new Image(),
    enemy_big_width: 110,
    enemy_big_height: 80,
    enemy_big_bombingImg_src: "../飞机游戏素材/爆炸/敌机爆炸2.png",
    enemy_big_bombingImg: new Image(),
    enemy_big_bombingImg_sideLen: 50,
    enemy_big_speed: 2,
    enemy_big_blood: 6,
    //敌人飞机数量
    enemy_maxNum: 6,

    canvas: null,
    context: null,
};
parameter.hero_image.src = parameter.heroImg_src;
parameter.enemyImg_small.src = parameter.enemyImg_small_src;
parameter.enemyImg_big.src = parameter.enemyImg_big_src;
parameter.hero_bombingImg.src = parameter.hero_bombingImg_src;
parameter.enemy_small_bombingImg.src = parameter.enemy_small_bombingImg_src;
parameter.enemy_big_bombingImg.src = parameter.enemy_big_bombingImg_src;