/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 * 
 * 
 */

// 导入数据操作模块
const db=require('../db/index');

// 导入bcryptjs包(用来加密)
const bcrypt=require('bcryptjs');


//导入生成token的包
const jwt=require('jsonwebtoken');
// 导入全局的配置文件
const config = require('../config');

// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 获取客户端提交到服务器的用户信息
  const userinfo=req.body;
  //  console.log(userinfo);测试输出[Object: null prototype] { username: 'sada', password: '123' }

  //对表单中的数据进行合法性的校验
  if(!userinfo.username||!userinfo.password){
    return res.send({status:1,message:'用户名或者密码为空!'})
  }

  //定义sql语句，查询用户名是否被占用
  const sqlStr='select * from ev_users where username=?'
  db.query(sqlStr,userinfo.username,(err,results)=>{
    //执行sql语句失败


    //在处理函数中，需要多次调用 `res.send()` 向客户端响应 `处理失败` 的结果，为了简化代码，可以手动封装一个 res.cc() 函数
    //   在app.js定义的，这样每次都不需要这样反复写
    if(err){
      //  return res.send({status:1,message:err.message}) 注释掉可以用 封装好的方法
      return res.cc(err);
    }
    //判断用户名字是否被占用
    if(results.length>0){
      //  return res.send({status:1,message:'用户名字被占用，请更换其他用户名！'}) 同样用封装的函数
      return res.cc('用户名字被占用，请更换其他用户名！');
    }
   
    // 数据库添加了一个 username 拐子  password 123123
    //然后postman进行测试发现  拐子重名了
   /*{  
      "status": 1,
      "message": "用户名字被占用，请更换其他用户名！"}*/
    
     //  通过两个判断后，用户名可以使用
     //调用模块的hashSync(需要加密的密码，生成的密码长度)对密码进行加密
     //console.log(userinfo);//加密前 { username: '野浩', password: '123' }
     userinfo.password=bcrypt.hashSync(userinfo.password,10);
     //console.log(userinfo);
     // 加密后{username: '野浩',password: '$2a$10$7PoZHfoMu0DSz16qk3zLvO1SKv4RjN.4u4zEt9lw2QMlv9FRKHPg2'}

     //定义插入新用户的sql语句
     const sql='insert into ev_users set ?';
     db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
       //判断sql语句是否执行成功
       if(err) {
         //return res.send({status:1,message:err.message})
        return res.cc(err);
        }
       // 判断影响行数是否为1
       if(results.affectedRows!==1){return res.cc('注册用户失败，稍后再试')};
       //return res.send({status:1,message:'注册用户失败，稍后再试'});

       //  通过上面判断，则说明注册用户成功


       // res.send({status:0,message:'注册成功！'});  封装
       res.cc('注册成功',0);//因为是成功了，所以状态改为0


       // ER_NO_DEFAULT_FOR_FIELD: Field 'id' doesn't have a default value
       //  注意注册表的时候要勾选上自动递增,不然就会报上面的错误
     })

  })

    //  res.send('reguser OK')  引入数据库就不能写这个了，有多个res.send，不然会报错
    
  }
  
  // 登录的处理函数
  exports.login = (req, res) => {
    // 接受表单的数据
    const userinfo=req.body
    //定义sql语句
    const sql=`select * from ev_users where username=?`
    // 执行sql语句
    db.query(sql,userinfo.username,(err,results)=>{
      // 执行sql语句失败
      if(err) return res.cc(err);
      // 执行sql语句成功，但获取到的数据条数不等于1
      if(results.length!==1) return res.cc('登录失败！')
      // 判断密码是否正确

      //  调用bcrypt.compareSync(用户提交的密码，数据库的密码)来比较密码是否一致
      // 返回值是布尔值  true一致，false不一致  
      //results 是一个数组对象，所以results[0]，在获取password属性，即为results[0].password
     const compareResult=bcrypt.compareSync(userinfo.password,results[0].password)
     if(!compareResult)return res.cc('登录失败!');

     //在服务端生成TOKEN的字符串

     //剔除敏感信息， 用户密码和用户头像,将其置空或者null
     const user={...results[0],password:'',user_pic:''}
     //  console.log(user);  //  发现password: '',user_pic: ''
    
     // 对用户的信息进行加密，生成密钥
     const tokenStr=jwt.sign(user,config.jwtSecretKey,{expiresIn:config.expiresIn})
     //console.log(tokenStr);
    //  输出eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJhZG1pbjEiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjpudWxsLCJlbWFpbCI6bnVsbCwidXNlcl9waWMiOiIiLCJpYXQiOjE2NDc1MTMyMTgsImV4cCI6MTY0NzU0OTIxOH0.02n4IDvZN10RJUnjXAzQ4KJp7gBV7sSmMpRzHMKAN-k
    
    // 调用res.send()将token响应给客户端
    res.send({
      status:0,
      message:'登录成功',
      // 为了方便客户端使用token，在服务器拼接上Bearer的前缀
      token:'Bearer ' + tokenStr,
    })
    })
  }