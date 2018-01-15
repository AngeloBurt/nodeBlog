/**
 * Created by FO on 2018/1/13 013.
 */
var mongoose = require('mongoose');
var contentsSchema = require('../schemas/contents');

module.exports = mongoose.model('Content',contentsSchema);