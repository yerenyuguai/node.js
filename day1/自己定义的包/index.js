//初始化包的基本结构
// ①新建myself-tools文件夹，作为包的根目录
// ②在myself-tools文件夹中,新建如下三个文件:
// package.json (包管理配置文件)
// index.js  (包的入口文件)
// README.md (包的说明文档)

//"keywords":是提供的关键字
//"name": "myself-tools"  包名
//   "version": "1.0.0" 版本号
//"license": "ISC"  开源许可协议为  ISC
//"main": "index.js"  入口文件


//index.js  是包的入口文件

//可以在这里写模块方法，但是，这里进行了模块拆分，dateFormat,htmlEscape,rehtml 都拆到其他的js模块里了

//这样就需要导入其他的模块
const date=require('./src/dateformat');
const escape=require('./src/htmlEscape');

//向外暴露 需要的成员
module.exports={
    ...date,
    ...escape//ES6里的语句   ...date表示展开运算符，将里面的每个属性交给module.exports所指向的对象
}


