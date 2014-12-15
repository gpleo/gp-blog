'use strict'

var mongoose = require('mongoose');

var BlogSchema = mongoose.Schema({
  title: String,
  contents: String,
  status: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  published_at: Date
});

function BlogModel () {
  this.Blog = mongoose.model('blog', BlogSchema);
}

/**
 * 获取Blog列表
 * @param data = {
 *   criteria: {}, // 条件
 *   fields: {},   // 选取的字段
 *   skip: Number, // 跳过记录数(default:0)
 *   limit: Number,// 选取记录数(default:10)
 *   sort: {}      // 排序
 * }
 * @param callback
 */
BlogModel.prototype.list = function (data, callback) {
  var criteria = {},
    fields = {},
    options = {
      skip: 0,
      limit: 10
    };

  if (data.criteria) {
    criteria = data.criteria;
  }
  if (data.fields) {
    fields = data.fields;
  }
  if (data.skip) {
    options.skip = data.skip;
  }
  if (data.limit) {
    options.limit = data.limit;
  }
  if (data.sort) {
    options.sort = data.sort;
  }

  this.Blog.find(criteria, fields, options, function (error, docs) {
    callback(error, docs);
  });
};

/**
 * 获取Blog总数
 * @param data = {
 *   criteria = {}  // 条件
 * }
 * @param callback
 */
BlogModel.prototype.count = function (data, callback) {
  var criteria = {};

  if (data.criteria) {
    criteria = data.criteria;
  }

  this.Blog.count(criteria, function (error, count) {
    callback(error, count);
  })
};

/**
 * 获取Blog详细内容
 * @param _id
 * @param callback
 */
BlogModel.prototype.get = function (_id, callback) {
  this.Blog.findOne({_id: _id}, function (error, doc) {
    callback(error, doc);
  });
};

/**
 * @param data = {
 *   title: String,
 *   contents: String
 * }
 * @param callback
 */
BlogModel.prototype.create = function (data, callback) {
  var blog = new this.Blog(data);
  blog.status = 'publish';
  blog.published_at = new Date();
  blog.save(function (error) {
    callback(error);
  });
};

module.exports = BlogModel;
