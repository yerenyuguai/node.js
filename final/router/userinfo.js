// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()



//  导入路由函数处理模块
const userinfo_handler=require('../router_handler/userinfo')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//导入需要的验证对象
const {update_userinfo_schema, update_password_schema,update_avatar_schema }=require('../schema/user')

// 获取用户的基本信息的路由
router.get('/userinfo',userinfo_handler.getUserInfo);

// 更新用户基本信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo);

//更新密码的路由
router.post('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword); 

// 更新用户头像的路由
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)

// 向外共享路由对象
module.exports = router