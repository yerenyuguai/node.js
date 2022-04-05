//这是路由模块

//导入express模块
const express=require('express');
//创建路由对象  ⭐⭐⭐⭐
const router=express.Router();// 路由的实例对象

//挂载具体路由

router.get('/',function(req,res){
    console.log("hhha get");
    res.send("hhha get");
})
router.post('/',function(req,res){
    console.log('hhha post');
    res.send("hhha post");
})

//向外导出路由
module.exports=router;