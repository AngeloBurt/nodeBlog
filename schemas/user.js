/**
 * Created by FO on 2017/12/31 031.
 */
var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin:{
        type: Boolean,
        default: false
    }

});



