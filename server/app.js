const express = require('express')
const axios = require('axios');

// axios.get('http://apis.juhe.cn/simpleWeather/query?city=%E8%8B%8F%E5%B7%9E&key=6fc3096e3e5ee9be2370c793621207a1').then(res=>{
//     console.log(res)
// })
const app = express()
app.use(express.static('web_src'))
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))