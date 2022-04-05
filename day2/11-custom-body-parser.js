// 这是为10服务的


// 导入querystring模块
const qs=require('querystring')

const bodyParse=(req,res,next)=>{
    //定义中间件具体的业务逻辑

    //定义一个字符串str，专门用来存储客户端发送过来的请求体数据
    let str=''
    //监听req的data事件  每次触发data事件，获取到数据只是完整数据的一部分，需要手动对接收到的数据进行拼接
    req.on('data',function(chunk){
        //进行字符串的拼接
        str+=chunk;
    })

    //监听req的end事件
    req.on('end',()=>{
        //在str 存放的是完整的请求体数据

        //console.log(str);
        //  可以在http://127.0.0.1/user端口的body中的x-www-form-urlencoded 输入key和value对应的值
        // 然后终端发现输出

        //TODO： 把字符串格式的请求体数据，解析成对象格式
        const body=qs.parse(str);

        //console.log(body);
        //可以在http://127.0.0.1/user端口的body中的x-www-form-urlencoded 输入key和value对应的值 
        // 输出结果为[Object: null prototype] { a: 'a', d: 'd', x: 'x' }
        // 发现变为对象形式

        req.body=body;//将解析出来的请求体对象，挂载为req.body属性
        next();// 不要忘了将流转关系转交

    })
}

module.exports=bodyParse