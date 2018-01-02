/**
 * Created by FO on 2017/12/31 031.
 */
var express = require('express');
//加载模板
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var app = express();
var User = require('./models/User');
//静态文件托管
app.use('/public', express.static(__dirname + '/public'));

app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
//开发过程中,需要取消模板缓存
swig.setDefaults({cache: false});
//bodyParser 设置
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            //req.userInfo.isAdmin = JSON.parse(req.cookies.get('userInfo'));
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch (e) {
            next();
        }
    } else {
        next();
    }
});

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

mongoose.connect('mongodb://localhost:27018/blog', function (err) {

    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功');
        app.listen(8081);
    }
});




