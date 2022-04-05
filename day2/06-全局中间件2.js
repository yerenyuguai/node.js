const express=require('express');
const app=express();


//中间件在实际开发中的作用  ⭐⭐⭐⭐⭐⭐⭐⭐
//多个中间件之间，共享同一份req和res，基于这样的特性，我们可以在上游(先声明的)的中间件中，
//统一为req或res对象添加自定义的属性或方法,供下游的中间件或路由进行使用

// 本例就为了展现这个效果  在每个路由 都能得到到达服务器的时间
//  如果不采取中间件，则需要在每个路由中const time=Date.now();获取time ，然后输出
//  而中间件就可以进行共享time这个属性  

app.use(function(req,res,next){
    //请求到达服务器的时间  
    const time=Date.now();
    // 为req对象，挂载自定义属性， 从而把时间共享给后面的所有路由
    req.starttime=time;
    next();
})
//  如果像定义多个中间件，可以多次app.use()来创建    客户端到达请求服务器之后，会按照中间件定义的先后顺序依次进行调用


app.get('/',function(req,res){
    res.send('home page'+req.starttime);//  每次的starttime都会变化,
})

app.get('/user',(req,res)=>{
    res.send('user page'+req.starttime);
})

app.listen(80,()=>{
    console.log('服务器运行在  http://127.0.0.1');
})