// 导入定义验证规则的包
const joi = require('joi')

//定义用户名和密码的验证规则
const username=joi.string().alphanum().min(1).max(10).required();//required()表示必填项

const password = joi.string().pattern(/^[\S]{6,12}$/).required(); //^[\S] $  以非空开头和结尾  {6，12}长度为六到十二

// 定义id.nickname,email的验证规则  number().integer()  nunber类型的整数
const id=joi.number().integer().min(1).required();
const nickname=joi.string().required();
const user_email=joi.string().email().required();


// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()


// 定义一个验证注册登录表单数据的规则对象
exports.reg_login_schema={
    body: {
        username,
        password,
      }
}

//定义一个验证更新用户基本信息的规则对象
exports.update_userinfo_schema = {
    // 需要对req.body里面的数据进行验证
  body: {// 或者简写 id  简写的前提是表单里的属性名和验证规则的名字一样，就行这里的emial
    id,
    nickname,
    email:user_email
  }
}


//定义一个验证更新密码的规则对象
exports.update_password_schema={
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  }
}

//定义一个验证更新头像的规则对象
exports.update_avatar_schema = {
  body: {
    avatar
  }
}