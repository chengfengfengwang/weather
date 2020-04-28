const Router = require('koa-router');
const fs = require('mz/fs')
const router = new Router();
router.post('/msg', async (ctx, next) => {
    const jsonPath = `${process.cwd()}/data/msg.json`;
    let jsonData = [];
    let res = await fs.readFile(jsonPath);
    if (res.toString()) {
        jsonData = JSON.parse(res.toString());
    }
    jsonData.push({
        "id": jsonData.length + 1,
        "time": formatTime(Date.now()),
        "msg": ctx.request.body.msg
    })
    let str = JSON.stringify(jsonData);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile(jsonPath, str, function (err) {
        if (err) {
            console.error(err);
        }
        console.log('----------新增成功-------------');
    })
    ctx.body = {
        msg: 'ok'
    }
    // let error = new ParameterException();
    // throw error
})
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
function formatTime(date) {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
}
module.exports = router