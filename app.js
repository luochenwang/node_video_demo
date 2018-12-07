//引入所需要的插件
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const path = require('path');


const router = require('./router');
const app = express();


//设置ejs的目录位置
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine','ejs');


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'views')));


// 所有的user请求
app.use("/",router);
app.listen(8999);


module.exports = app;