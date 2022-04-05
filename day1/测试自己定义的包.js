const mybao=require('./自己定义的包/index');
//  自己定义的包/index  如果没有写index，node导入时，发现没有写，就去package.json里找，
//发现有main  然后通过main可以找到index.js

//调用包里dateformat格式化时间的功能
const dt=mybao.dateFormat(new Date());

console.log(dt);

//将html文档进行转义
const htmlstr='<h1 title="123">这是h1标签<sapn>这是span标签</span>&nbsp</h1>'
const str=mybao.htmlEscape(htmlstr);
console.log(str);

//还原html文档
const newhtml=mybao.rehtml(str);
console.log(newhtml);