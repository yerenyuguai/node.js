const fs=require('fs');
//使用fs.writeFile()方法 向指定文件写入内容
//参数一  需要指定一个文件路径的字符串，存放文件的存放路径     参数二 表示写入的内容
//参数三   可选参数 以什么格式写入，默认utf-8    参数四  文件写入完成后的回调函数
fs.writeFile('./111.txt','拐子',function(err){
    if(err){
      return console.log('文档写入失败'+err.message);
    }
    //如果写入成功，err的值为null
    //如果写入失败，err的值是一个错误对象
    console.log('文件写入成功');
    //只能写入，不能读取，即为无法传参dataStr
});