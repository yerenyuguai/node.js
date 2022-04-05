//但是为了方便对路由进行模块化的管理，不建议将路由直接挂载到app上，而是推荐将路由抽离变为单独的模块
const express=require('express');
const app=express();

//导入路由模块
const router=require('./路由模块-服务于04');
//注册路由模块（即为将路由挂载到app上）,让其生效
app.use('/qianzhui',router);          //  这样测试必须要有前缀 即为写成这样 http://127.0.0.1/qianzhui

//app.use()  函数的作用，就是用来注册全局中间件  后续会提到中间件
//  如果希望也有前缀  就app.use('/qianzhui',router);  02对外提供静态资源有讲到


app.listen(80,(req,res)=>{
    console.log('服务器运行   http://127.0.0.1');
})