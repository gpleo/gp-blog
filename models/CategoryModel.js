'use strict'

var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
  name: String
});

function CategoryModel () {
  this.Category = mongoose.model('category', CategorySchema);
}

/**
 * 获取Category列表
 * @param data
 * @param callback
 */
CategoryModel.prototype.list = function (data, callback) {
  this.Category.find({}, function (error, docs) {
    callback(error, docs);
  });
};

module.exports = CategoryModel;