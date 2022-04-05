//引入三个模块
const fs=require('fs');
const http=require('http');
const path=require('path');

//创建web服务器
const server=http.createServer();
//设置web服务器的request事件
server.on('request',function(req,res){
//  获取到客户端请求的url地址
var url=req.url;        //不是完整路径，比如  /chaifen/index.css


//把请求的url地址映射为具体文件的存放路径
  // const fpath=path.join(__dirname,url)//__dirnamej就表示这个js文件所处的目录
//  优化，上一行语句，要求用户输入必须chaifen/index.html  过于麻烦， 希望在路径直接index.html
let fpath='';
if(url==='/'){
    //如果请求路径为/，啧手动指定文件存放路径
    fpath=path.join(__dirname,'./chaifen/index.html');
}else{
    //如果请求路径不为/，则动态拼接文件的存放路径,即用户不写，我们后台自动拼接
    fpath=path.join(__dirname,'./chaifen',url);
    //点击端口,路径中没有/，自动找到路径
}


//  /chaifen/index.html       http://127.0.0.1/chaifen/index.html

//根据映射过来的路径读取文件的内容
fs.readFile(fpath,'utf-8',function(err,dataStr){
    if(err){return res.end('404 Not Found');}
    //读取成功，将读取成功的内容，响应给客户端
    res.end(dataStr);
    //打开检查发现  浏览器会主动请求js和css相关的  根据index.html里的内容，自动补齐
})

})
//启动服务器
server.listen(80,function(){
    console.log('服务器运行成功 http://127.0.0.1');
})