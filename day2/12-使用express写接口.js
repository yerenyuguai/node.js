const express=require('express');
const app=express();


//配置解析表单数据的中间件
app.use(express.urlencoded({extended:false}))


//  解决跨域问题  一定要在路由之前 配置cors 这个中间件，从而解决跨域的问题
// 这样在13 里就可以解决跨域的问题
const cors=require('cors');
app.use(cors);

//导入路由模块  
const router=require('./apirouter服务12');

//把路由模块，注册到app上
app.use('/api',router);   


//   http://127.0.0.1/api/get  然后服务器就响应这三个对象 去postman测试
// {
//     "status": 0,
//     "msg": "GET请求成功",
//     "data": { }
// }  由于没有传参，所以data为空

//   http://127.0.0.1/api/get?a=2&b=0    或者param面板上
// {
//     "status": 0,
//     "msg": "GET请求成功",
//     "data": {
//         "a": "2",
//         "b": "0"
//     }
// }





//  http://127.0.0.1/api/post   body 找到x-www-form-urlencoded, 然后输入key value
// {
//     "status": 0,
//     "msg": "POST请求成功",
//     "data": {
//         "bookname": "shuhui",
//         "zuozhe": "dasda"
//     }
// }
app.listen(80,function(){
    console.log('服务器运行在  http://127.0.0.1');
})