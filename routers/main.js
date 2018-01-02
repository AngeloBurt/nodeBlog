/**
 * Created by FO on 2017/12/31 031.
 */
var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
    console.log(req.userInfo);
    res.render('main/index',{
        userInfo: req.userInfo
    })
});
module.exports = router;



