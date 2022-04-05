## 了解Session认证的局限性
Session认证机制需要配合Cookie才能实现。由于Cookie默认不支持跨域访问，所以，当涉及到前端跨域请求后端接
口的时候，需要做很多额外的配置，才能实现跨域Session认证。
注意:
当前端请求后端接口不存在跨域问题的时候，推荐使用Session身份认证机制。
当前端 需要跨域请求后端接口的时候， 不推荐使用Session身份认证机制，推荐使用JWT认证机制。

## 推荐使用JWT认证机制

JWT（英文全称  JSON Web Token）是目前最流行的跨域认证解决方案

JWT 的工作原理
用户的信息通过加密生成Token字符串的形式，保存在客户端浏览器中(将token存储到LocalStorage或SessionStorage)，
当客户端再次发起请求时，通过请求头的Authorization字段，将token发给服务器，服务器通过还原Token字符串的形式来认证用户的身份

##  JWT的组成部分  
JWT通常由三部分组成,分别是Header(头部),Payload(有效荷载),Signature(签名)
三者之间用 英文的  .  进行分隔  ，格式如下
Header.Payload.Signature     

其中Payload部分是真正的用户信息，他是用户信息经过加密之后生成的字符串，
Header和Signature是安全性相关的部分，只是为了保证Token的安全性


## JWT的使用方式
客户端收到服务器返回的JWT之后，通常会将它存储在localStorage或sessionStorage中
此后，客户端每次与服务端进行通信，都会带上这个JWT字符串，从而进行身份验证，推荐到做法是
将  JWT放在http请求头的Authorization字段中，格式如下
Authorization: Bearer <token>

#  安装JWT相关的包  
终端运行如下命令，安装JWT两个相关的包
npm install jsonwebtoken express-jwt

jsonwebtoken 用于生成JWT字符串
express-jwt用于将JWT字符串解析还原成JSON对象


#  导入JWT相关的包
导入用于生成JWT字符串的包
   const jwt = require('jsonwebtoken')
导入用于将客户端发送过来的JWT字符串，解析还原成JSON对象的包
   const expressJWT = require( 'express-jwt' )


# 在Express中使用JWT    定义secret密钥
为了保证JWT字符串的安全性,防止JWT字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密
的secret密钥:
①当生成JWT字符串的时候，需要使用secret密钥对用户的信息进行加密，最终得到加密好的JWT字符串
②当把JWT字符串解析还原成JSON对象的时候，需要使用secret密钥进行解密

 secret 密钥的本质:就是一个字符串
 const secretKey = 'shaoyuhe No1 ^ _A'