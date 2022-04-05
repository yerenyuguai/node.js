//  路由     生活例子， 10086 按键1，按键2等 每一个按键对应对应不同的服务    路由就是按键与服务的映射关系
//  而在express中 ，路由是指客户端的请求与服务端处理函数之间的映射关系  
//  Express中的路由有三部分组成 分别是请求的类型，请求的url地址，处理函数
//格式如下  app.METHOD(path,HANDLER)  METHOD 可以是post或者get， path客户具体要请求的url地址

// 路由的匹配过程
// 每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。
// 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的URL同时匹配成功，则Express会将这次请求,
// 转交给对应的function函数进行处理。

// 路由匹配的注意点:
// ①按照定义的先后顺序进行匹配
// ②请求类型和请求的URL同时匹配成功,
// 才会调用对应的处理函数

const express=require('express');
const app=express();

// 挂载路由 ，监听客户端get请求 地址是客户端的地址
app.get('/',(req,res)=>{
    res.send('hello get');
})
// 挂载路由，监听客户的post请求
app.post('/',function(req,res){
    res.send('hello post');
})

app.listen(80,()=>{
    console.log('服务器运行在  http://127.0.0.1');
})
//去postman   http://127.0.0.1   依次get 和post

//但是为了方便对路由进行模块化的管理，不建议将路由直接挂载到app上，而是推荐将路由抽离变为单独的模块