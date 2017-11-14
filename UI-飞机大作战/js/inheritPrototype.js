/****
 * 该函数作用为重写child_obj对象的原型（重写为空原型），并把该空原型连接到father_obj对象的原型，
 * 从而扩展了child_obj对象的原型链，使child_obj对象能继承father_obj对象的共享属性的同时，
 * 能增强自身实例而又不会影响到父对象的实例（这是因为增强的属性项都添加到自身的空原型上了）
 * 1. child_obj为子对象的构造函数函数名，father_obj为父对象的构造函数函数名
 * **/

function inheritPrototype(child_obj, father_obj) {
    function Func(){}		//定义一个空的构造函数
    Func.prototype = father_obj.prototype;		//重写上面构造函数的原型为father_obj对象的原型

    var prototype = new Func();	//prototype意为实例，经过后面的操作后他确实也作为传入对象child_obj的实例
    child_obj.prototype = prototype;		//把prototype作为child_obj的实例
    prototype.constructor = child_obj;		//让prototype指向child_obj构造函数，实际上constructor属性会搜索到实例链的末端
}