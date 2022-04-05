// 导入定义验证规则的模块
const joi = require('joi')
// 定义 分类名称name 和 分类别名alias 的校验规则
const name = joi.string().required();
const alias = joi.string().alphanum().required()//alphanum() 值只能是包含 a-zA-Z0-9 的字符串
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()


// 校验规则对象 - 添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}
// 校验规则对象 - 删除分类
exports.delete_cate_schema = {
    //params传参时参数会附于rul后面以问号形式展示
    //  而比如/deletecate/:id   id就是params形式
    params: {
        id,
    },
}
// 校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
    params: {
        id,
    },
}
// 校验规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
      id: id,
      name,
      alias,
    },
  }