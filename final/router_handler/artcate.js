// 导入数据库操作模块
const db = require('../db/index')

// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
    //定义查询分类列表数据的sql语句
    // 根据分类的状态，获取所有未被删除的分类列表数据
    // is_delete 为 0 表示没有被 标记为删除 的数据    order by id asc  根据id顺序排序
    const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })
}


//新增文章分类的处理函数
// 去postman  http://127.0.0.1:3007/my/article/addcates 点击body  x-www-form-urlencoded 依次给name 和alias赋值 
exports.addArticleCates = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句   or 或
    const sql = `select * from ev_article_cate where name=? or alias=?`
    // 执行查重操作
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分别判断 分类名称 和 分类别名 是否被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 新增文章分类的sql语句
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
          
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
          
            // 新增文章分类成功
            res.cc('新增文章分类成功！', 0)    
          })
    })
}
// 删除文章分类的处理函数
// 比如给id为3  http://127.0.0.1:3007/my/article/deletecate/3
// postman里 get请求  去headers  输入key  Authorization  和  value登录产生的token
exports.deleteCateById = (req, res) => {
    //执行删除的sql语句  //就是让is_delete的值变为1
    const sql = `update ev_article_cate set is_delete=1 where id=?`

    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
      
        // 删除文章分类成功
        res.cc('删除文章分类成功！', 0)
      })
  }

  // 根据 Id 获取文章分类的处理函数
  // 比如给id为1  http://127.0.0.1:3007/my/article/cates/1
// postman里 get请求  去headers  输入key  Authorization  和  value登录产生的token
exports.getArticleById = (req, res) => {
    // 定义根据 Id 获取文章分类的 SQL 语句：
    const sql = `select * from ev_article_cate where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
      
        // 把数据响应给客户端
        //results 返回的就是数组对象，但我们是根据id查找，所以只有一个，所以results[0]就可以
        res.send({
          status: 0,
          message: '获取文章分类数据成功！',
          data: results[0],
        })
      })
  }

  // 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句   <>是不等于  等价于!=
const sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
// 执行查重操作
db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 判断 分类名称 和 分类别名 是否被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
  
    //更新文章分类
    const sql = `update ev_article_cate set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      
        // 更新文章分类成功
        res.cc('更新文章分类成功！')
      })
  })
  }