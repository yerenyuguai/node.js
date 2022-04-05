const express=require('express');
const app=express();


//这是解析表单数据的中间件

//  导入11模块 自己封装到自定义模块
const customBodyParse=require('./11-custom-body-parser');

//将自定义的中间件函数注册为全局可用的中间件
app.use(customBodyParse)

app.post('/user',(req,res)=>{
    res.send(req.body);
    //发现服务器访问到了
})


app.listen(80,function(){
    console.log('服务器运行在 http://127.0.0.1');
})