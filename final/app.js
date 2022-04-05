// 看ev_api_server.md
// 导入express
const express=require('express');
// 创建服务器实例对象
const app=express();

const joi = require('joi')

//导入并配置cors中间件
const cors=require('cors');
app.use(cors());





// 路由之前封装一个函数 ⭐⭐⭐
//  这样就在全局封装了一个函数，后续的路由就可以调用这个函数
//  在处理函数中，需要多次调用 `res.send()` 向客户端响应 `处理失败` 的结果，为了简化代码，可以手动封装一个 res.cc() 函数
app.use(function(req,res,next){
    //status=1默认值为1，标识失败的情况  err值可能是一个错误对象或者错误的描述字符串
    res.cc=function(err,status=1){  // 形参赋值是es6里的
        res.send({
            status,
            message:err instanceof Error?err.message:err
            //  status设置了默认值1，  message的描述  instanceof Error 判断错误的类型
            //  是就返回err对象的message属性值返回，否则直接返回err字符串
        })
    }
    next();//不要忘记next();  ⭐⭐⭐⭐
})


//配置解析表单数据的中间件 ，注意这个中间件只能解析 application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({extended:false}))


//一定要在路由之前配置解析token的中间件
const expressJwt=require('express-jwt');
const config=require('./config');

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证  
//   [/^\/api\//]  /api/  都不需要token认证
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))



// 导入并注册用户路由模块 
const userRouter = require('./router/user')
app.use('/api', userRouter);// 注册为一个路由的模块，之后访问这个路由模块的每一个路由的时候，都需要在访问路径前面
//  加一个   /api 的前缀


// 导入并使用用户信息的模块    
//http://127.0.0.1:3007/my/userinfo  
//没有Authorization，  初始没有 postman 里headers手动添加Authorization
//然后再http://127.0.0.1:3007/api/login 进行post请求得到token
    // 然后将token复制到value，就可以输出
const userinfoRouter=require('./router/userinfo')
app.use('/my',userinfoRouter);  // 这样涉及到用户信息相关的都要加一个/my/



// 导入并使用文章分类的路由模块
//http://127.0.0.1:3007/my/article/cates
//没有Authorization，  初始没有 postman 里headers手动添加Authorization
//然后再http://127.0.0.1:3007/api/login 进行post请求得到token
    // 然后将token复制到value，就可以输出 
const artCateRouter=require('./router/artcate')
//挂在统一的访问前缀
app.use('/my/article',artCateRouter);



// 导入并使用文章路由模块
const articleRouter = require('./router/article') 
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)


//定义错误级别的中间件
app.use(function (err, req, res, next) {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    
    //身份认证失败的错误
    //  http://127.0.0.1:3007/my/textabc       /my/textabc 随便写的  
    //   expressJwt中间件判断请求头有没有Authorization，  初始没有
    // postman 里head手动添加Authorization，abc
    // 然后再http://127.0.0.1:3007/api/login 进行post请求得到token
    // 然后将token复制到value，就可以
    //  http://127.0.0.1:3007/my/textabc  但服务器没有提供这个接口，所以认证失败，但是身份认证是成功的 】
    if(err.name === 'UnauthorizedError')return res.cc('身份认证失败!');

    // 未知错误
    res.cc(err);
  })



//启动服务器
app.listen(3007,function(){
    console.log('服务器运行在 http://127.0.0.1:3007');
})
//  postman 输入http://127.0.0.1:3007/api/reguser 点击body 找到x-www-form-urlencoded 添加数据
//    取消左边的黑色对勾，发现    "message": "\"username\" is required"   
//  * required() 值是必填项，不能为 undefined  是这个的原因