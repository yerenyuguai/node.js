//定义格式化时间的方法
function dateFormat(dtStr){
const dt=new Date(dtStr);
// 获取年月日时分秒
const year=dt.getFullYear();
const month=padZero(dt.getMonth()+1);
const d=padZero(dt.getDate());
const hour=padZero(dt.getHours());
const minute=padZero(dt.getMinutes());
const second=padZero(dt.getSeconds());

//拼接一个字符串  使用模板字符串的形式
//   return 'YYYY-MM-DD HH:mm:ss'
 return `${year}-${month}-${d} ${hour}:${minute}:${second}`

}
//补零的函数  日月时分秒都是两位数
function padZero(n){
     return n>9?n:'0'+n;// n>9 返回n ，n小于9补零
}

//需要将dateFormat()方法暴露出去，不然外界访问不到
module.exports={
    dateFormat
}
