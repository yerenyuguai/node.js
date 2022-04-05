// 导入数据库操作模块
const db = require('../db/index');

//导入处理密码的模块
const bcrypt = require('bcryptjs')


// 获取用户信息的处理函数
exports.getUserInfo = (req, res) => {
    //定义查询用户信息的sql语句
    // 根据用户的 id，查询用户的基本信息
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    const sql = `select id, username, nickname, email, user_pic from ev_users where id=?`
    // 调用db.query() 执行sql语句
    //req.user  固定写法，只要认证成功 req就会多一个user的属性
    db.query(sql, req.user.id, (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err);
        //成功，但查询到结果为空
        if (results.length !== 1) return res.cc('获取用户信息失败！');

        //用户信息获取成功
        //  同样的先要在http://127.0.0.1:3007/api/login登录，然后在Headers输入账号密码的的key和value
        // 得到token，然后token复制到http://127.0.0.1:3007/my/userinfo，点击Headers
        // key Authorization ,value token字符串
        /*
        {
        "status": 0,
        "msg": "获取用户信息成功",
        "data": {
            "id": 5,
            "username": "admin1",
            "nickname": null,
            "email": null,
            "user_pic": null
        }   密码没有提供给用户
        */
        res.send({
            status: 0,
            msg: '获取用户信息成功',
            data: results[0]//因为是数组对象，但是根据id获取，所以只有一个所以results[0]即可
        })
    })
}


//更新用户信息的处理函数
exports.updateUserInfo = (req, res) => {
    //定义待执行的sql语句
    const sql = `update ev_users set ? where id=?`
    //调用db.query()执行的sql语句并传递参数
    db.query(sql, [req.body, req.body.id], (err, results) => {
        //执行sql语句失败
        if (err) return res.cc(err);
        //执行成功，但是影响行数不为1
        if (results.affectedRows !== 1) return res.cc('更新用户基本失败')
        //成功
        res.cc('更新用户基本信息成功', 0);

        /*
        http://127.0.0.1:3007/my/userinfo 端口，post请求 body  x-www-form-urlencoded
        依次对id,nickname,email进行修改
        然后打开数据库，可以看到进行了修改
        */
    })
}


//重置密码的处理函数
exports.updatePassword = (req, res) => {
    // 定义根据 id 查询用户数据的 SQL 语句
    const sql = `select * from ev_users where id=?`

    // 执行 SQL 语句查询用户是否存在
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 检查指定 id 的用户是否存在
        if (results.length !== 1) return res.cc('用户不存在！')

        //判断提交的旧密码是否正确  bcrypt.compareSync(old,new)  两个值比较，返回true或者false
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误!');

        //说明旧密码错误
        // 定义更新用户密码的 SQL 语句
        const sql = `update ev_users set password=? where id=?`

        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        // 执行 SQL 语句，根据 id 更新用户的密码
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')

            // 更新密码成功
            res.cc('更新密码成功！', 0)
        })

    })
}

//更新用户头像的处理函数

//http://127.0.0.1:3007/my/update/avatar 然后 在body x-www-form-urlencoded里添加 key avatar  
//value   data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
exports.updateAvatar=(req,res)=>{
    // 定义更新头像的sql语句
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
      
        // 更新用户头像成功
        return res.cc('更新头像成功！', 0)
      })
}