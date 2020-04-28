const koa = require('koa');
const app = new koa();

const fs = require('fs');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const requireDirectory = require('require-directory');


app.use(cors());
//require('./models/user')
//异常处理
app.use(bodyParser());
//路由
requireDirectory(module, './api', {
    visit(obj) {
        app.use(obj.routes());
    }
});




app.listen('80')