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
function formatTime(date) {
    var date = date;
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //秒没有返回
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
function getCityAndWeather(ip) {
    var murl = `http://api.map.baidu.com/location/ip?ip=${ip}&ak=i0iMPWgjCyDuVDO7xoQaum0ySlGe79AH`;
    axios.get(murl).then(mres => {
        var city = mres.data.content.address.replace('市', '');
    })
}
var weatherInfo, lastReqTime, lastReqCity, ipAdress;
app.get('/weather', (req, res) => {
    console.log('----')
    console.log(req.ip)
    ipAdress = req.ip.split('::ffff:')[1];
    console.log('----')
    //var city = encodeURIComponent(req.query.city);
    
    
    var murl = `http://api.map.baidu.com/location/ip?ip=${ipAdress}&ak=i0iMPWgjCyDuVDO7xoQaum0ySlGe79AH`;
    axios.get(murl).then(mres => {
        var ocity = mres.data.content.address.split('省')[1];
        var city = ocity.replace('市', '');
        console.log('----')
        console.log(city)
        console.log('----')
        var reqJuhe = (new Date().valueOf() - lastReqTime) < 1000 * 60 * 10;
        // if (weatherInfo && reqJuhe && city === lastReqCity) {
        //     res.json(weatherInfo)
        //     return
        // }
        axios.get('http://apis.juhe.cn/simpleWeather/query?city=' + encodeURIComponent(city) + '&key=6fc3096e3e5ee9be2370c793621207a1').then(response => {
            lastReqTime = new Date().valueOf();
            lastReqCity = city;
            response.data.reqTime = formatTime(lastReqTime);
            weatherInfo = response.data;
            weatherInfo.ipAdress = ipAdress;
            weatherInfo.city = city+'市';
            res.json(response.data)
        })
    })

})

app.listen(80, () => console.log('Example app listening on port 80!'))