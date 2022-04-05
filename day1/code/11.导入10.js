const m=require('./10.module对象')
//  如果导入的模块里面没有内容  ,输出是一个{},这说明  
//  在一个自定义模块中，默认情况下，module.exports={}，得到的就是module.exports所指向的对象
//即为 在外界使用require()导入一个自定义模块的时候，得到的成员就是导入模块中通过module.exports指向的对象
//这也就说明 输出{}  就是输出了对象
console.log(m);

//由于module.exports单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了exports 对象。默认情况
//下，exports和module.exports指向同一个对象。 最终共享的结果,还是以module exports指向的对象为准。