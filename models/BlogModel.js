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

BlogModel.prototype.list = function (callback) {
  this.Blog.find({}, function (error, docs) {
    callback(error, docs);
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
