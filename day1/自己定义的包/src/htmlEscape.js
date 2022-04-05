//定义转义 html字符的函数
function htmlEscape(htmlstr){
    return htmlstr.replace(/<|>|"|&/g,function(match){//如果字符中含有  <  >  "  &字符就进行替换
     switch(match){
         case '<':
             return '&lt;'
         case '>':
             return '&gt;'
         case '"':
             return '&quot;'
         case '&':
             return '&amp;'
     }
    })
 }
 
 //还原html的方法  和上面基本一样
 function rehtml(str){
     return str.replace(/&gt;|&lt;|&quot;|&amp;/g,function(match){//如果字符中含有  <  >  "  &字符就进行替换
         switch(match){
             case '&lt;':
                 return '<'
             case '&gt;':
                 return '>'
             case '&quot;':
                 return '"'
             case '&amp;':
                 return '&'
         }
        })
 }

 //向外暴露  
 module.exports={
     htmlEscape,
     rehtml
 }