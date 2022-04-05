const http=require('http');
const server=http.createServer();
server.on('request',function(req,res){
//  获取请求的 url地址
const url=req.url;
// 设置默认的响应内容为404 Not found
let content='<h1>404 Not found!</h1>'
// 判断用户请求的是否为/或/index.html 首页
if(url==='/'||url==='/index.html'){
    //  /表示默认页面
    content='<h1>首页</h1>'
    console.log(content);
}else if(url==='/about.html'){// 判断用户请求的是否为/about.html  关于页面
    content='<h1>关于页面</h1>'
    console.log(content);
    //http://127.0.0.1/about.html  这样就可以查看
}
// 设置Content-Type响应头，防止中文乱码
res.setHeader('Content-Type','text/html;charset=utf-8');
// 使用res.end()把内容响应给客户端
res.end(content);
})
server.listen(80,function(){
    console.log('服务器在http://127.0.0.1');
})