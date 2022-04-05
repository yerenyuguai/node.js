const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

//导入验证数据表单的中间件
const expressjoi=require('@escook/express-joi');
// 导入需要的验证规则对象
const {reg_login_schema}=require('../schema/user');


// 注册新用户
//在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
//1数据验证通过后，会把这次请求流转给后面的路由处理函数
//2数据验证失败后，终止后续代码的执行，并抛出一个全局的Error 错误，进入全局错误级别中间件中进行处理
router.post('/reguser',expressjoi(reg_login_schema),userHandler.regUser)//调用 userHandler里的函数regUser


// 登录   校验规则也是expressjoi(reg_login_schema)
router.post('/login',expressjoi(reg_login_schema), userHandler.login)
//  数据库添加了一个    admin1  123123 去postman  
//   http://127.0.0.1:3007/api/login这个地址  body里x-www-form-urlencoded 输入账号密码  之后 login OK
module.exports = router;