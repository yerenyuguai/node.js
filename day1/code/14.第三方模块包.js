//  发现dateFormat.js和  .\13.测试dateformat.js 进行时间的格式化过于麻烦
//我们可以直接用第三方的包

// npm install 包的完整名字      来进行安装包
// npm i 包的完整名字    和上面的一样


//  下载  moment包  终端  输入下载     npm i moment
//  但是如果想下载某个特定版本的包  就用@后接指定版本   npm i moment@2.22.3   2大版本 22功能版本  3bug修复版本
//  版本号的提升规则：只要前面的版本号增长了，则后面的版本号归零
// 导入第三方的  moment包
const moment=require("moment");
// 1.参考moment 官方API 文档，调用对应的方法，对时间进行格式化
// 2调用moment() 方法，得到当前的时间
// 3针对当前的时间，调用format() 方法，按照指定的格式进行时间的格式化
const dt=moment().format('YYYY-MM-DD HH:mm:ss');
console.log(dt);

//初次装包之后  项目文件夹多了一个 node_modules的文件夹(存放所有安装到项目中的包)
//和 package-lock.json的配置文件 包含的是node_modules目录下每一个包的下载信息，包括包的名字，版本号和下载地址

//package.json则记录了项目中安装了哪些包    再执行命令所处目录中，终端输入  npm init -y 可快速生成
//  现在貌似导入包的时候自动生成了
// 这个命令只能在纯英文的目录下成功运行  ，所以项目文件夹命名时不要出现中文和空格
//"dependencies"  这个节点就用来记录npm install 命令安装了哪些包

// npm install  安装所有包   
//  npm  uninstall  moment  卸载moment包

/*
包的分类
1.项目包
那些被安装到项目的node_modules目录中的包，都是项目包。
项目包又分为两类，分别是:
●开发依赖包(被记录到devDependencies节点中的包，只在开发期间会用到)
●核心依赖包 (被记录到dependencies节点中的包，在开发期间和项目上线之后都会用到)
终端下
npm i 包名 -D   #开发依赖包(会被记录到devDependencies 节点下)
npm i 包名      #核心依赖包(会被记录到dependencies 节点F)

2.全局包
在执行npm install命令时，如果提供了-g参数，则会把包安装为全局包。
全局包会被安装到C:\Users\用户目录\AppData\Roaming\npm\node_modules目录下。
判读这个包是否需要全局安装，可以参考官方提供的使用说明

3 i5ting_toc
是一个可以把md文档转换成html页面的工具
终端下载   npm insatll -g i5ting_toc
调用i5ting_toc,轻松实现md转html的功能
i5ting_toc -f 要转换的路径 -o
*/

/*
一个规范的包，它的组成结构,必须符合以下3点要求:
包必须以单独的目录而存在
包的顶级目录下要必须包含package.json 这个包管理配置文件
package.json中必须包含name, version, main这三个属性,分别代表包的名字、版本号、包的入口。
*/


//  注册了一个npm账号
//  账号是  yerenyuguai   密码是 shaoyuhe123  绑定邮箱是 2898549292@qq.com
// 在终端登录    执行  npm login 命令  然后依次输入账号密码邮箱和邮箱验证码即可登录 

//发布包时候检查一下 是不是在npm的官方服务器上  npx nrm ls     如果不是，比如是淘宝的镜像npx  nrm use npm

//将终端切换到包的根目录下面，运行  npm publish 命令，即可发布到npm上，注意 包名不能雷同

//   + shaobao-tools@1.0.0 出现一个包  这时候就可以去https://www.npmjs.com/  查找，发现自己发布了一个包

//  版本更新了之类的不要忘记更改版本号

//  npm unpublish 包名 -force   命令可以从npm删除已经发布的包 ，注意只能删除七十二小时内的包
// 此外删除的包，24小时内不允许再次发布，发布包的时候要慎重，尽量不要往npm发布没有意义的包