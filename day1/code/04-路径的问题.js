//使用fs模板操作文件时，如果提供的路径是../或者./开头的相对路径，很容易出现路径动态拼接错误的问题
//原因:代码在运行时，会以执行node命令时的所处的目录，动态拼接处被操作文件的完整路径
//  D:\Node.js基础\day1\code>   +    ./111.txt    这种方式进行拼接
// 但是有一些不得已的操作比如 cd../  往上翻一层    D:\Node.js基础\day1> 这样的话在拼接就出现问题了


const fs=require('fs');
/*
fs.readFile('./111.txt','utf-8',function(err,dataStr){
    if(err){
        return console.log("读取文件失败！");
    }
    console.log('读取文件成功!'+dataStr);
});//这里就是相对路径
*/


//如果要解决这个问题，可以直接提供一个完整的文件存放路径，如下
//  D:\Node.js基础\day1\code\111.txt    
// 注意  js中\代表转义，所以要写两个
//fs.readFile('D:\\Node.js基础\\day1\\code\\111.txt','utf-8',function(err,dataStr){

//上面的相对路径 就变得移植性特别的差,不利于维护

//所以可以用下面的方法解决  __dirname表示当前文件所处的目录

fs.readFile(__dirname + '/111.txt', 'utf-8', function (err, dataStr) {
    if (err) {
        return console.log("读取文件失败！" + err.message);
    }
    console.log('读取文件成功!' + dataStr);
});//这里就是相对路径


//path 模块是Node.js官方提供的，用来处理路径的模块，提供了一系列的方法和属性
// path.join() 用来将多个路径片段进行拼接成一个完整的路径字符串   任意多个
//  path.basename()  用来从路径字符串中，将文件名解析出来
//  因为是模块,所以同样需要导入   ⭐⭐⭐⭐⭐

const path=require('path');
console.log(path.join('/a','/b','../','/d','e'));//注意../ 会把前面的路径抵消掉，即为/b被抵消,../也没有了
console.log(path.join(__dirname , '/111.txt'));//注意是,号⭐⭐⭐⭐⭐  
console.log('------------');
//以后就推荐用下面的方法来解决路径问题⭐⭐⭐⭐⭐ ⭐⭐⭐⭐⭐ 
/*
fs.readFile(path.join(__dirname , '/111.txt'), 'utf-8', function (err, dataStr) {
    if (err) {
        return console.log("读取文件失败！" + err.message);
    }
    console.log('读取文件成功!' + dataStr);
});
*/


//path.basename()方法 可以获取路径中的最后一部分，最后一个/后，经常通过这个方法获取路径的中文名
//  参数 path 必选参数，表示一个路径的字符串      ext 可选参数，表示文件的扩展名  ‘
//  返回路径中的最后一部分

const fpath='/a/b/c/index.html'//文件的存放路径
var fullName=path.basename(fpath);
console.log(fullName);// 输出index.html;

var nameWithoutExt=path.basename(fpath,'.html');//表示.html是扩展名，不获取
console.log(nameWithoutExt);//输出 index

// path.extname() 的语法格式   可以获取文件的扩展名部分   参数path 表示一个路径的字符串
console.log(path.extname(fpath));