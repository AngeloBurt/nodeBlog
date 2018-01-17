/**
 * Created by FO on 2017/12/31 031.
 */
var express = require('express');
var router = express.Router();
var Content = require('../models/Content');
var Category = require('../models/Category');

router.get('/', function (req, res, next) {
    var data = {
        userInfo: req.userInfo,
        category: req.query.category || "",
        categories: [],
        count: 0,
        page: Number(req.query.page || 1),
        limit: 10,
        pages: 0
    }
    var where = {};
    if (data.category) {
        where.category = data.category;
    }

    Category.find().then(function (categories) {
        data.categories = categories;
        return Content.where(where).count();
    }).then(function (count) {
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
module.exports = router;



