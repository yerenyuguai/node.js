const express=require('express');
const app=express();


//  express.json 解析json格式的请求体数据(有兼容性，只在4.16.0版本及其之后可以使用)
//         配置解析applicat ion/json格式数据的内置中间件，只需要执行这一句即可
//   因为是请求体数据  所以在postman 找到body 然后选择raw，在选择json格式  按照下面的编写完成后
/*   点击send,向这个地址发送一个请求体数据   发现终端界面出现{ name: '拐子', style: 'shabi', age: 20 }
{
    "name":"拐子",
    "style":"shabi",
    "age":20
}
*/
//  除了错误级别的中间件，其他的中间件，必须在路由之前进行配置
//  通过express.json()这个中间件，解析表单中的json格式的数据
app.use(express.json())


// express.urlencoded解析URL-encoded格式的请求体数据(有兼容性，只在4.16.0版本及其之后可以使用)
//  配置解析application/x-ww form-ur lencoded格式数据的内置中间件，只需要执行这一句即可
//  因为同样也是请求体数据，所以也是body，不过之后要选择 x-www-form-urlencoded
app.use(express.urlencoded({ extended:false }))



//定义路由
app.post('/user',(req,res)=>{
    //在服务器可以使用req.body来接受客户端发送过来的请求体数据
    //  默认情况下服务器端如果不配置解析表单数据的中间件，log输出的是undefined
    //  即为这一句app.use(express.json())
    console.log(req.body);
    res.send('ok');
})


//定义路由
app.post('/book',function(req,res){

    //默认情况下服务器端如果不配置解析表单数据的中间件，log输出的是{}
    //  即为这一句app.use(express.urlencoded({ extended:false }))
    console.log(req.body);
    //  [Object: null prototype] { bookname: '西游记', author: '吴承恩' }
    res.send('ok!!');
})

app.listen(80,()=>{
    console.log('服务器运行在 http://127.0.0.1');
})