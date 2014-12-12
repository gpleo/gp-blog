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
 *   page: {
 *     page_number: Number(default: 10),
 *     limit: Number(default: 0)
 *   }
 * }
 * @param callback
 */
BlogModel.prototype.list = function (data, callback) {
  var fields = {
    title: 1,
    created_at: 1
  }, options = {
    skip: 0,
    limit: 2,
    sort: {
      create_at: -1
    }
  };

  if (data.page && data.page.limit && data.page.limit > 0) {
    options.limit = data.page.limit;
  } else {
    options.limit = 10;
  }
  if (data.page && data.page.page_number && data.page.page_number > 0) {
    options.skip = data.page.page_number * options.limit;
  }

  this.Blog.find({}, fields, options, function (error, docs) {
    callback(error, docs);
  });
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
