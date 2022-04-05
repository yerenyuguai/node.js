// mysql 模块是托管于npm上的第三方模块，它提供了node.js项目在链接和操作数据库的能力
//  终端 npm i mysql

// 配置mysql模块   必要 ⭐⭐⭐⭐ 
//  导入mysql模块  
const e = require('express');
const mysql=require('mysql');

// 建立与mysql 数据库的链接

const db=mysql.createPool({
    host:"127.0.0.1", //数据库的ip地址,本机
    user:'root',//登录数据库的账号
    password:'Password',//登录数据库的密码  这是我自己电脑的Password  ，记住了
    database:'edu'//指定要操作哪个数据库
})
// 测试mysql模块能否正常运行
db.query('SELECT 1',(err,results)=>{//SELECT 1 无意义，只是用来测试是否可以工作
    if(err){
        // mysql模块工作期间报错了
        return console.log(err.message);
    }
    // 能够成功执行sql语句
    console.log(results);  //[ RowDataPacket { '1': 1 } ]表示连接成功
})


//  vscode 里面下载mysql插件  和MySQL synatx插件
// 然后找到文件栏找到mysql 点击加号


// 查找member表中的所有用户数据         edu里面有一个member表
const sqlStr='SELECT * FROM member';
db.query(sqlStr,(err,results)=>{
    // 查询失败
    if(err) return console.log(err.message);
    //查询成功  输出的是数组类型的数据
    console.log(results);
    /*
    [
  RowDataPacket {
    id: 1,
    name: 'la',
    password: '134562',
    sex: '男',
    phone: '123456789'
  },
  RowDataPacket {
    id: 2,
    name: 'ha',
    password: '123456',
    sex: '女',
    phone: '111111111'
  },
  RowDataPacket {
    id: 3,
    name: 'xx',
    password: '123456',
    sex: '男',
    phone: '222222222'
  },
  RowDataPacket {
    id: 4,
    name: 'sh',
    password: '123456',
    sex: '男',
    phone: '222222222'
  }
]
    */
})


//向member新增数据,其中name是拐子  password 是123123      name和password是member表里的属性，不是随便起的

// 插入到member表中的数据对象           这里因为其他sql语句没有注释，所以导致id可能出现错误
const member={name:'拐子',password:'123123'}
// 待执行的sql语句，其中英文的?表示占位符
const sqlStr1='INSERT INTO member(name,password)value(?,?)';
// 使用数组的形式，依次为？占位符号指定对应的值
    
// 如果数据对象的每个属性和数据表的字段一一对应，则可以通过如下方式快速插入数据
  //const sqlStr1='INSERT INTO member SET ?';  有几个属性插入几个
db.query(sqlStr1,[member.name,member.password],(err,results)=>{
    if(err) return console.log(err.message);//失败

    //注意 如果执行的是insert into插入语句，则results是一个对象
    // 可以通过affectedRows属性来判断是否插入成功
    if(results.affectedRows===1){console.log('插入数据成功!');}//成功
})



//更新数据  
// 要更新的数据对象
const member1={id: 4, name:'野浩',password:'123456'};
//要执行的sql语句
const sqlStr2='UPDATE member SET name=?,password=? where id=?';

//  同样的如果数据对象的每个属性和数据表的字段一一对应，
// const sqlStr2='UPDATE member SET ? where id=?';

// 调用 db.query()执行SQL语句的同时，使用数组依次为占位符指定具体的值
db.query(sqlStr2,[member1.name,member1.password,member1.id],(err,results)=>{
  if(err)return console.log(err.message);
  if(results.affectedRows===1){console.log('更新数据成功！');}//成功
})


//删除
// 定义要执行的sql语句  这个是根据id
const sqlStr3='DELETE FROM member WHERE id=?'
//  调用db.query()执行sql语句的同时，为占位符指定具体的值
//  如果： 如果 sql语句语句中有多个占位符?，则必须使用数组为每个占位符指定具体的值
//  如果sql语句中只有一个占位符，则可以省略数组
db.query(sqlStr3,1,(err,results)=>{  // 1是 id
  if(err){return console.log(err.message);}//失败
  if(results.affectedRows===1){console.log('删除数据成功！');}//成功
})


// 但是 DELETE语句，会真正把数据从表中删除，为了保险起见，推荐使用标记删除的形式，来模拟删除的动作
// 所谓标记删除 就是在表中设置 status这样的状态字段，来标记当前这个数据是否被删除
// 当用户执行了删除的动作时，我们并没有执行delete语句把数据删除掉，而是执行了UPDATE语句，将这条语句对应的
// status字段标记为删除即可，  比如把表中要删除的设置为1，然后其他的都为0，这样变相删除了设置为1的

// 可以把某个表注释掉，查看想要的效果，然后在Untitled-1.sql上进行查询，右键 run MySQL query

 

