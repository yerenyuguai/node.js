// 自己手动模拟一个类似于express.urlencoded 这样的中间件，来解析POST提交到服务器的表单数据。
// 实现步骤:
// 定义中间件

// 监听req的data事件，来获取客户端发送到服务器端数据
//  如果数据比较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器，所以data事件可能会触发多次
//  每次触发data事件，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接

// 监听req的end事件
//  在请求体数据接受完毕之后，会自动触发req的end事件   所以可以在end事件，可以拿到并处理完整的请求体数据

// 使用querystring模块解析请求体数据
// node.js内置了一个querystring模块，用来处理查询字符串，通过这个模块提供的parse()函数
// 可以轻松把查询字符串解析成对象的格式
// 由于弃用了   去源码里删除这一行    *@deprecated Legacy 就可以了

// 将解析出来的数据对象挂载为req.body
// 因为上游的中间件和下游的中间件及路由之间，共享一份req和res，因此我们可以将解析出来的数据
// 挂载为req的自定义属性，命名为req.body，供下游使用

// 将自定义中间件封装为模块
//为了优化代码结构，我们可以把自定义的中间件函数，封装为独立的模块



const express=require('express');
const app=express();
// 导入querystring模块
const qs=require('querystring')

//这是解析表单数据的中间件
app.use((req,res,next)=>{
    //定义中间件具体的业务逻辑

    //定义一个字符串str，专门用来存储客户端发送过来的请求体数据
    let str=''
    //监听req的data事件  每次触发data事件，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接
    req.on('data',function(chunk){
        //进行字符串的拼接
        str+=chunk;
    })

    //监听req的end事件
    req.on('end',()=>{
        //在str 存放的是完整的请求体数据

        //console.log(str);
        //  可以在http://127.0.0.1/user端口的body中的x-www-form-urlencoded 输入key和value对应的值
        // 然后终端发现输出

        //TODO： 把字符串格式的请求体数据，解析成对象格式
        const body=qs.parse(str);

        //console.log(body);
        //可以在http://127.0.0.1/user端口的body中的x-www-form-urlencoded 输入key和value对应的值 
        // 输出结果为[Object: null prototype] { a: 'a', d: 'd', x: 'x' }
        // 发现变为对象形式

        req.body=body;//将解析出来的请求体对象，挂载为req.body属性
        next();// 不要忘了将流转关系转交

    })
})

app.post('/user',(req,res)=>{
    res.send(req.body);
    //发现服务器访问到了
})


app.listen(80,function(){
    console.log('服务器运行在 http://127.0.0.1');
})