/**
 * 参数处理工具
 * Date: 2014-12-01
 */

var check = require('validator').check;

// 组成可以用eval执行的命令
var makeupCommand = function (desc) {
  var index;
  if (desc.fieldLimit.command === undefined || desc.fieldLimit.command === null || desc.fieldLimit.command.trim() === '') {
    return null;
  }
  index = desc.fieldLimit.command.indexOf('(');
  if (index === -1) {
    return desc.fieldLimit.command;
  }
  return desc.fieldLimit.command.substring(0, index);
};

// 检查request的body、params、query，取出数据值
var getValue = function (req, fieldName) {
  var v = null;
  if (req.body[fieldName]) {
    v = req.body[fieldName];
  } else if (req.params[fieldName]) {
    v = req.params[fieldName];
  } else if (req.query[fieldName]) {
    v = req.query[fieldName];
  }
  return v;
};

/**
 * 一个处理Http请求中参数的类
 * @param req http request对象
 * @param descs 参数描述数据数组
 * [{
 *   fieldName : String
 *   fieldLimit : {command: 方法, errorMessage: 错误信息}
 * }]
 * command:
 *   notEmpty()
 *   isInt()
 *   isAlpha()
 *   isEmail()
 *   len(6, 20)
 *   ......
 * ------------------------
 * 如果最终req.validationErrors()没有错误，会组装参数值到req.data
 * 否则由route中返回req.validationErrors()的错误
 */
exports.processHttpParams = function (req, descs) {
  var i,
    j,
    len,
    desc,
    descNew,
    command,
    data = {},
    v,
    params;
  for (i = 0, len = descs.length; i < len; i = i + 1) {
    desc = descs[i];
    command = makeupCommand(desc);
    if (command !== null) {
      if (desc.fieldLimit.params) {
        params = desc.fieldLimit.params;
        if (params.length === 1) {
          req.assert(desc.fieldName, desc.fieldLimit.errorMessage)[command](params[0]);
        } else if (params.length === 2) {
          req.assert(desc.fieldName, desc.fieldLimit.errorMessage)[command](params[0], params[1]);
        } else if (params.length === 3) {
          req.assert(desc.fieldName, desc.fieldLimit.errorMessage)[command](params[0], params[1], params[2]);
        }
      } else {
        req.assert(desc.fieldName, desc.fieldLimit.errorMessage)[command]();
      }
    }
  }

  if (!req.validationErrors()) {
    for (j = 0, len = descs.length; j < len; j = j + 1) {
      descNew = descs[j];
      v = getValue(req, descNew.fieldName);
      if (v !== null) {
        data[descNew.fieldName] = v;
      }
    }
    req.data = data;
  }
};

// 用于方便处理字段描述的类
var Descs = function () {
  var descs = [];
  this.addDesc = function (fieldName, command, errorMessage, params) {
    descs.push({fieldName: fieldName, fieldLimit: {errorMessage: errorMessage, command: command, params: params}});
  };
  this.getAll = function () {
    return descs;
  };
};
/**
 * 获取描述类实例
 * @returns {Descs}
 * @constructor
 */
exports.getDescs = function () {
  return new Descs();
};