// 回顾JSONP的概念与特点

// 概念:  浏览器端通过<script> 标签的src属性,请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据
// 的方式叫做JSONP。
// 特点:
// ①JSONP 不属于真正的Ajax请求,因为它没有使用XMLHttpRequest这个对象。
// ②JSONP 仅支持GET请求,不支持POST. PUT、 DELETE 等请求。


// 创建JSONP接口的注意事项
// 如果项目中已经配置了CORS跨域资源共享,为了防止冲突，必须在配置CORS中间件之前声明JSONP的接口。否则
// JSONP接口会被处理成开启了CORS的接口。示例代码如下:  ⭐⭐⭐

// 优先创建JSONP的接口,这个接口不会被处理成CORS接口   
//   app.get('/api/jsonp',(req,res)=>{})

// 在配置CORS中间件[后续的所有接口，都会被处理成CORS接口]
// app.use(cors())

// 这个就是开启了CORS的接口
//  app.get('/api/get',(req,res)=>{})

const express=require('express');
const app=express();


//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))

// 必须在cors中间件之间前配置jsonp接口，只支持get
app.get('/api/jsonp',(req,res)=>{
    //  TODO 定义jsonp接口的具体实现过程

    //  获取客户端发送过来的回调函数名字
    const funcName=req.query.callback;
    // 得到要通过JSONP形式发送给客户端的数据
    const data={name:'拐子',age:22}
    // 根据前两步得到的数据，拼接出一个函数调用的字符串
    const scriptStr=`${funcName}(${JSON.stringify(data)})`
    // 把上一步拼接得到的字符串，响应给客户端的<scrpit> 标签进行解析执行


    //script请求就是加载资源，遇到函数调用字符串，本地下载后就会执行，callback函数逻辑在客户端代码中，服务器这块只管返回函数调用

    res.send(scriptStr)
})

//  去13 测试json按钮
const cors=require('cors');
app.use(cors);

//导入路由模块  
const router=require('./apirouter服务12');

//把路由模块，注册到app上
app.use('/api',router);   

app.listen(80,function(){
    console.log('服务器运行在  http://127.0.0.1');
})
