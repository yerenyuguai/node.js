const fs=require('fs');
const path=require('path');

//定义正则表达式，分别匹配style标签和script标签   <\/style>   / 需要转义，不然会当作正则表达式的右边分界
const regStyle = /<style>[\s\S]*<\/style>/       //  \s表示空白字符  \S表示非空白  *匹配任意次
const regScript = /<script>[\s\S]*<\/script>/

fs.readFile(path.join(__dirname,'./index.html'),'utf-8',function(err,dataStr){
    if(err){return console.log('文档读取失败'+err.message)}
    //读取html文档成功，调用对应的方法，拆解出css，js，html文件
    console.log('文档读取成功！');
    resolveCSS(dataStr);
    resolveJS(dataStr);
    resolveHTML(dataStr);
})

//定义处理css样式的方法
function resolveCSS(htmlStr){
    //使用正则表达式提取页面中<style></style>标签
    const r1=regStyle.exec(htmlStr);        //  exec()用来检索字符串中的正则表达式的匹配，
    //匹配返回的是一个数组，但实际上就一个元素,所以下面的r1[0],   如果没有匹配到就返回null
    //将提取出来的样式字符串，做进一步的处理
    var newCss=r1[0].replace('<style>','').replace('</style>','');

   //关键的一点  在原来的html文件中  <style>  不能出现  <style  src='...'>之类的，不然正则匹配不上  ⭐⭐⭐

    fs.writeFile(path.join(__dirname,'./chaifen/index.css'),newCss,function(err){

        //不用自己创建，这个方法会自己创建，只需要写好路径，和文件名就好  './chaifen/index.css'
        if(err){return console.log('css写入失败'+err.message);}
        console.log('css写入成功！');
    })
} 

//定义处理js样式的方法
function resolveJS(htmlStr){
    //使用正则表达式提取页面中<style></style=>标签
    const r2=regScript.exec(htmlStr);//  exec()用来检索字符串中的正则表达式的匹配，
    //匹配返回的是一个数组，但实际上就一个元素,所以下面的r1[0],   如果没有匹配到就返回null
    //将提取出来的样式字符串，做进一步的处理
    const newJs=r2[0].replace('<script>','').replace('</script>','');
    //将提取出来的css样式，写入到index.css文件中去
    fs.writeFile(path.join(__dirname,'./chaifen/index.js'),newJs,function(err){
        if(err)return console.log("js写入失败"+err.message);
        console.log("成功写入js样式");
    })
}

//定义处理js样式的方法
function resolveHTML(htmlStr){
    //字符串调用replace方法，把内嵌的style和script标签，替换为外联的link和script标签
   const newHtml= htmlStr.replace(regStyle,'<link rel="stylesheet" href="./index.css">').replace(regScript,'<script src="./index.js"></script>');
   //写入html文件
   fs.writeFile(path.join(__dirname,'./chaifen/index.html'),newHtml,function(err){
       if(err){return console.log("写入html失败"+err.message);}
       console.log("写入html页面成功");
   })
}

//fs.writeFile()只能用来创建文件，不能用来创建路径
//  重复调用fs.writeFile()写入同一个文件，新写入的内容会覆盖原来的内容 ⭐⭐⭐