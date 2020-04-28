const koa = require('koa');
const app = new koa();
const serve = require('koa-static');

const fs = require('fs');
const path = require('path');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const requireDirectory = require('require-directory');
const home   = serve(path.join(__dirname)+'/web_src/');


app.use(cors());
//require('./models/user')
//异常处理
app.use(bodyParser());
app.use(home); 
//路由
requireDirectory(module, './api', {
    visit(obj) {
        app.use(obj.routes());
    }
});




app.listen('80')