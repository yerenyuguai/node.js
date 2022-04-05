//     不使用app.use() 的中间件就是局部中间件

const express=require('express');
const app=express();

//定义中间件的mw
const mw=function(req,res,next){
    console.log('中间件函数');
    next();
}
//mw 这个中间件只在当前路由中生效，这种用法属于  局部生效的中间件  中间传了mw这个中间件参数
//  即为中间件只会在这个路由里生效  ⭐⭐⭐⭐
app.get('/',mw,(req,res)=>{
    res.send('Home Page')
})


//如何定义多个局部中间件呢   app.get('/',mw1,mw2,mw3,..(req,res)=>{  按照从左到右的顺序依次执行中间件
//     app.get('/',[mw1,mw2,mw3,..,],(req,res)=>{          这两种方式是等价的


// 注意，局部中间件不会影响下面这个路由
app.get('/user',function(req,res){
    res.send('user page')
})
//  发现并不会输出 中间件里   console.log('中间件函数');
app.listen(80,()=>{
    console.log('服务器运行在  http://127.0.0.1');
})