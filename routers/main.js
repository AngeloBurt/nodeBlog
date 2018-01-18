/**
 * Created by FO on 2017/12/31 031.
 */
var express = require('express');
var router = express.Router();
var Content = require('../models/Content');
var Category = require('../models/Category');
var data;
/*
 * 处理通用数据
 * */
router.use(function (req, res,next) {
    data = {
        userInfo: req.userInfo,
        categories: []
    }
    Category.find().then(function (categories) {
        data.categories=categories;
        next();
    })
})


router.get('/', function (req, res, next) {
    //var data = {
    //    category: req.query.category || "",
    //    count: 0,
    //    page: Number(req.query.page || 1),
    //    limit: 10,
    //    pages: 0
    //}
    data.category = req.query.category || "";
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 10;
    data.pages = 0;
    var where = {};
    if (data.category) {
        where.category = data.category;
    }

    Content.where(where).count().then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count / data.limit);
        data.page = Math.min(data.page, data.pages);
        data.page = Math.max(data.page, 1);
        var skip = (data.page - 1) * data.limit;
        return Content.where(where).find().sort({_id: -1}).limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        })
    }).then(function (contents) {
        data.contents = contents;
        res.render('main/index', data)
    })

})
;
router.get('/view', function (req, res) {
    var contentId = req.query.contentid || '';
    Content.findOne({
        _id: contentId
    }).then(function (content) {
        data.content = content;
        content.views++;
        content.save();
        res.render('main/view',data)
    })
})
















module.exports = router;



