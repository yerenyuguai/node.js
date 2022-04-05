//在自定义模块中，默认情况下，module.exports={}
module.exports.username='张三';  
//向外共享一个成员  张三，即为
//向module.exports上挂载一个username属性
module.exports.sayHello=function(){
    console.log('hello!!');
}
//向module.exports上挂载一个sayHello方法

//也可以将模块的私有成员，向外暴露
const age=20;
module.exports.age=age;

//添加一个对象   这样注意，这里让module.exports指向了下面的新对象，上面的旧对象不再生效，外界也拿不到
module.exports={
    name:'拐子',
    sex:'雄性',
    say(){
        console.log('我要送钱给同学');
    }
}

module.exports.address='撤硕';//再往module.exports指向的对象添加一个属性

//由于module.exports单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了exports 对象。默认情况
//下，exports和module.exports指向同一个对象。 最终共享的结果,还是以module exports指向的对象为准。

module.exports.tel='12345';

exports.tel2='54321';//最终共享的结果,还是以module exports指向的对象为准。
//使用require()方法导入模块时，导入的结果，永远以module.exports指向的对象为准

//  假设忽视前面的
//exports.usernname='lllaa'
// module.exports.gender='男'        特殊情况
//   这样输出情况为  {username:"lllaa",gender:'男'}

//总之 ⭐⭐⭐⭐⭐⭐exports和module.exports指向同一个对象。 最终共享的结果,还是以module exports指向的对象为准。

//所以为了防止混乱，在同一个模块中，不要exports和module.exports同时使用

/*
Node.js中的模块化规范
Node.js遵循了CommonJS模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖。
CommonJS规定:
 每个模块内部, module 变量代表当前模块。
 module变量是一个对象，它的exports属性(即module.exports)是对外的接口。
 加载某个模块，其实是加载该模块的module.exports属性。require()方法用于加载模块。
*/