const express = require('express')
const axios = require('axios');


const app = express()
app.use(express.static('web_src'))
app.get('/weather', (req, res) => {
    var city = encodeURIComponent(req.query.city);
    axios.get('http://apis.juhe.cn/simpleWeather/query?city='+city+'&key=6fc3096e3e5ee9be2370c793621207a1').then(response=>{
        res.json(response)
    })
    
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))