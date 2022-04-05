//将原本的成绩  横排书写变为竖着整理书写，用：分割人名和成绩

// ①导入需要的fs文件系统模块
const fs = require('fs');
// ②使用fs.readFile0方法，读取素材目录下的成绩.txt文件
// ③判断文件是否读取失败
fs.readFile('../成绩.txt', 'utf-8', function (err, dataStr) {
    if (err) {
        return console.log('文件读取失败！' + err.message);
    }
    console.log('读取文件成功！' + dataStr);

    // ④文件读取成功后，处理成绩数据
    //把数据按照空格进行分割，循环分割后的数据，将每一项的数据进行字符串的替换操作  =替换为：
    const arr = dataStr.split(' ');//分割
    const newarr = [];
    arr.forEach(function (item) {
        newarr.push(item.replace('=', ':'));//替换成:
    })
    //再把数组中的每一项，进行合并，得到一个新的字符串
    var str = newarr.join('\r\n');//让每一项都回车换行

    // ⑤将处理完成的成绩数据，调用fs.wrteFile()方法,写入到新文件成绩ok.txt中
    fs.writeFile('../成绩ok.txt', str, function (err) {
        if (err) {
            return console.log('文件写入失败！' + err.message);
        }
        console.log('成绩写入成功！');
    })
})


