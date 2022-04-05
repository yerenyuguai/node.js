// express 提供了一个非常好用的函数   express.static() 通过它，我们就可以非常方便的创建一个静态资源服务器  
//  例如 通过如下代码，可以将public目录下的图片，css文件，js文件对外开放访问了
//   app.use(express.static('public'))
//  比如   http://localhost:3000/image/bg.jpg
//注意: Express 在指定的静态目录中查找文件，并对外提供资源的访问路径。因此,存放静态文件的目录名不会出现在URL中。
//  即http://localhost:3000/image/bg.jpg 中没有public

//  但是如果像强制加前缀   就改为 app.use('/public',express.static('./public'));
//  http://localhost:3000/public/image/bg.jpg   变成这样

const express=require('express');
const app=express();

//将out下的所有文件对外提供成静态资源  调用 express.static()方法  快速对外提供静态资源
//  需要app.use() 方法进行调用  out下就是要对外提供的资源
app.use(express.static('./out'));

//当然如果需要托管多个静态目录，就多次调用express.static()函数
//如果含有同样的文件，就按照调用的顺序

app.listen(80,()=>{
    console.log('服务器运行在 http://127.0.0.1');
})