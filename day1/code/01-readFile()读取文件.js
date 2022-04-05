// 01-使用readfile方法读取文件内容

//用到了fs文件系统模板  它是Node.js官方提供的,用来操作文件的模块，提供了一系列的方法和属性
//  fs.readFile()  读取文件      fs.writeFile()将指定内容写入到文件
//在js代码中，如果需要fs模板来操作文件，就需要用下面的语句来导入这个模板
const fs=require('fs');

//调用fs.readFile()方法读取文件
//参数一  读取文件的相对路径  参数二读取文件编码格式，默认utf-8  参数三 回调函数拿到读取失败和成功的结果 err失败dataStr成功的结果
fs.readFile('./111.txt','utf-8',function(err,dataStr){
    //打印失败的结果    如果读取成功，err的值为null
    // 所以就可以通过判断err值是否为null，来判断文件读取的结果   err.message
    console.log(err);
    console.log('-----');
    //打印成功的结果   如果读取失败，则err的值为错误对象，dataStr的值为undefined
    console.log(dataStr);
})
// 找到文件路径，按住shift，点击鼠标右键，点击powershell，进入终端，然后node js文件名
//如果文件名太复杂，可以输入前几个，然后tab键可以自动补全，然后敲击回车，输出结果

