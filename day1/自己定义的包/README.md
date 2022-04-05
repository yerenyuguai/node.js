这里的内容没有强制性的要求，只要能够清晰地把包的作用、用法。注意事项等说明清楚即可
针对这个包而言，我们包含以下6个内容  
安装方式、导入方式、格式化时间、转义HTML中的特殊字符、还原HTML中的特殊字符、开源协议
下面是标准格式   ```js 表示后面的是js语句   ## 标题

## 安装

```
npm install shaobao-tools

```
## 导入

```js   
const mybao=require('shaobao-tools') 

```
## 格式化时间

```js
//调用 dateFormat 对时间进行格式化
 const dt=mybao.dateFormat(new Date());
 console.log(dt);
//2022-03-11 21:00:53 结果如下
```

## 转义html中的特殊字符

```js
//待转化的htmlstr
const htmlstr='<h1 title="123">这是h1标签<sapn>这是span标签</span>&nbsp</h1>'
//调用htmlEscape方法进行转化
const str=mybao.htmlEscape(htmlstr);
console.log(str);
//输出结果如下
&lt;h1 title=&quot;123&quot;&gt;这是h1标签&lt;sapn&gt;这是span标签&lt;/span&gt;&amp;nbsp&lt;/h1&gt;

```

## 还原html文档的内容

```js

//调用rehtml方法进行还原
const newhtml=mybao.rehtml(str);
console.log(newhtml);
//<h1 title="123">这是h1标签<sapn>这是span标签</span>&nbsp</h1>  输出结果如此
```

## 开源协议

ISC