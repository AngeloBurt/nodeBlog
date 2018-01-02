/**
 * Created by FO on 2017/12/31 031.
 */
var mongoose = require('mongoose');
var userSchema = require('../schemas/user');

module.exports = mongoose.model('User',userSchema);
