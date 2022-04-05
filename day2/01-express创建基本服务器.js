/*
1.什么是Express
官方给出的概念: Express 是基于Node.js平台,快速、开放、极简的Web开发框架。
通俗的理解: Express 的作用和Node.js 内置的http模块类似，是专门用来创建Web服务器的。
Express的本质:就是一个npm上的第三方包，提供了快速创建Web服务器的便捷方法。
Express的中文官网:. http://www.expressjs.com.cn/

思考:不使用Express能否创建Web服务器?
答案:能，使用Node.js提供的原生http模块即可。

思考:既生瑜何生亮(有了http内置模块，为什么还有用Express) ?
答案: http内置模块用起来很复杂，开发效率低; Express 是基于内置的http模块进一步封装出来的， 能够极大的提高开发效率。

思考: http内置模块与Express是什么关系?
答案:类似于浏览器中Web API和jQuery的关系。后者是基于前者进一步封装出来的。

3. Express能做什么
对于前端程序员来说，最常见的两种服务器,分别是:
Web 网站服务器: 专门对外提供Web网页资源的服务器。
API 接口服务器: 专门对外提供API接口的服务器。
使用Express,我们可以方便、快速的创建Web网站的服务器或API接口的服务器。

安装express           终端     npm i express@4.17.1            @后面是一个版本号
*/

//导入express
const express = require('express');
//创建web服务器
const app = express();


//监听客户端的GET  请求  app.get()  
//  参数1:客户端请求的URL地址
//  参数2:请求对应的处理函数
//  req:请求对象(包含了与请求相关的属性与方法)
//  响应对象(包含了与响应相关的属性与方法)
//    app.get( '请求URL', function(req, res) { /*处理函数*/ })


//监听客户端的post请求   app.post()
//   参数1:客户端请求的URL 地址
//   参数2:请求对应的处理函数
//   req:请求对象(包含了与请求相关的属性与方法)
//   res:响应对象(包含了与响应相关的属性与方法)
// app.post('请求URL', function(req, res) { /*处理函数*/ })

//把内容相应给客户端
//通过res.send0方法，可以把处理好的内容,发送给客户端:


app.get('/user', (req, res) => {
    //向客户端发送JSON 对象
    res.send({ name: 'guaizi', age: 20, gender: '男' })
})
app.post('/user', (req, res) => {
    //向客户端发送文本内容
    res.send('请求成功')
})


//  去postman 输入 http://127.0.0.1 分别切换get和post方法  发现输出结果


//获取URL中携带的查询参数
//通过req.query对象，可以获取到客户端发送过来的查询参数
app.get('/', (req, res) => {
    // req.query 默认是个空对象
    //客户端使用?name=guaizi&age=20 这种查询字符串形式，发送到服务器的参数，
    // 可以通过req.query对象访问到,例如:
    // req.query.name        req.query.age
    res.send(req.query);
})

//  去postman 输入 http://127.0.0.1  换成json 发现是一个空对象
//  然后 修改为 http://127.0.0.1?age=12&name=yehao  或者在prarm上写  ，服务器就响应这两个对象
//  这样就可以通过 req.query.name        req.query.age等属性在客户端进行使用了



//获取URL中的动态参数
//通过req.params对象，可以访问到URL中，通过:匹配到的动态参数:   即为:id是一个动态的参数 
// :是固定的，后面的id是你自己起的，  也可以叫 :yehao
// URL 地址中，可以通过:参数名的形式，匹动态参数值   同时也可以匹配多个动态参数  :id/:name
app.get('/user/:id/:name', (req, res) => {
    // req.params 默认是一个空对象  
    //里面存放着通过动态匹配到的参数值
    console.log(req.params)
    res.send(req.params)

    //  即为   http://127.0.0.1/user/1    输出{  id:'1'}
    // http://127.0.0.1/user/shabi/拐子  输出{ id: 'shabi', name: '拐子' }
})

//调用 app.listen(端口号，启动成功后的回调函数)，启动服务器
app.listen(80, () => {
    console.log('express server running at http://127.0.0.1');
})