const express=require('express');
const app=express();

// 全局中间件  靠这个方法app.use() 当客户端发起任意请求的时候，只要请求到达服务器都会触发的中间件
//  有请求路由这个指令的话，就会先执行中间件，然后执行路由

//中间件在实际开发中的作用  ⭐⭐⭐⭐⭐⭐⭐⭐
//多个中间件之间，共享同一份req和res，基于这样的特性，我们可以在上游(先声明的)的中间件中，
//统一为req或res对象添加自定义的属性或方法,供下游的中间件或路由进行使用

// 常量mw 所指向的就是一个中间件函数
const mw=function(req,res,next){
    console.log('一个简单的中间件函数');
    //注意  在当前中间件的业务处理完毕后，必须调用next()函数

    //表示  把流转关系交给下一个中间件或者路由  ⭐⭐⭐
    next();
}

//  将mw  注册为全局生效的 中间键
app.use(mw);


//  当然上面的两步可以简化成一步 

//   app.use(function(req,res,next){ console.log('这是一个简单的中间数函数');   next();    })
 
//定义一个路由
app.get('/',(req,res)=>{
    console.log('调用了 / 这个路由');
    res.send('home page')
})

//再定义一个
app.get('/user',(req,res)=>{
    console.log('调用了 /user 这个路由');
    res.send('user page')
})

app.listen(80,()=>{
    console.log('服务器运行在  http://127.0.0.1');
})

//运行发现首先是  进行中间件，然后再把流转关系交给路由   输出顺序一个简单的中间件函数  调用了 / 这个路由


