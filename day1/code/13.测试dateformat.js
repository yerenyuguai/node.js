//导入自定义的格式化的时间的模块
const time=require('./dateFormat.js');

//  没有进行格式化的时间
const dt=new Date();
console.log(dt);
//调用方法，进行时间的格式化
const newdt=time.dateFormat(dt);
console.log(newdt);