/**
 * Created by FO on 2017/12/31 031.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        res.send('对不起,只有管理员才可以进入该页面');
        return;
    }
    next()
});
//首页
router.get('/', function (req, res, next) {
    //res.send('后台用户中心')
    res.render('admin/index')
});
//用户管理
router.get('/user', function (req, res) {

    var page = Number(req.query.page || 1);
    //var limit = Number(req.query.limit || 5);
    var limit = 5;
    var pages = 0;

    User.count().then(function (count) {
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        var skip = (page - 1) * limit;
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                limit: limit,
                pages: pages,
                count: count,
                page: page
            })
        })
    });

});

//分类首页
router.get('/category', function (req, res) {
    res.render('admin/category', {
        userInfo: req.userInfo
    })
})
module.exports = router;



