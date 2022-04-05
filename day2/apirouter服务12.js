const { application } = require('express');
const express=require('express');
const router=express.Router();

//这里挂载对应的路由  Get接口
router.get('/get',(req,res)=>{
    //通过req.query获取到 客户端通过查询字符串发送到服务器的数据
    const query=req.query;
    //调用 res.send()方法，向客户端响应处理的结果
    res.send({
        status:0, //0 表示处理成功   1表示处理失败
        msg:'GET请求成功',//状态的描述
        data:query  // 需要相应给客户端的数据
    })
})


//这里挂载对应的路由  post接口
router.post('/post',(req,res)=>{
    //通过req.body 获取请求体包含的urlencoded 格式的数据
    const body=req.body;
    //调用 res.send()方法，向客户端响应处理的结果
    res.send({
        status:0, //0 表示处理成功   1表示处理失败
        msg:'POST请求成功',//状态的描述
        data:body  // 需要相应给客户端的数据
    })
})


//定义 DELETE接口          
router.delete('/delete',(req,res)=>{
    res.send({
        status:0,
        msg:'DELETE请求成功'
    })
})

//将路由向外暴露出去
module.exports=router;