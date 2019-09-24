const express = require('express')
const axios = require('axios');


const app = express()
app.use(express.static('web_src'));

//跨域设置
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//项目上线后改成页面的地址
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});
app.get('/weather', (req, res) => {
    var city = encodeURIComponent(req.query.city);
    console.log('请求到来');
    axios.get('http://apis.juhe.cn/simpleWeather/query?city=' + city + '&key=6fc3096e3e5ee9be2370c793621207a1').then(response => {
        res.json(response.data)
    })

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))