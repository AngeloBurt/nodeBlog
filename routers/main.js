/**
 * Created by FO on 2017/12/31 031.
 */
var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

router.get('/',function(req,res,next){
    Category.find().sort({_id:-1}).then(function(categories){
        //console.log(req.userInfo);
        res.render('main/index',{
            userInfo: req.userInfo,
            categories: categories
        })
    })

});
module.exports = router;



