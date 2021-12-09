const express = require('express')
const redis = require('redis')


const PORT = process.env.PORT || 8080

const client = redis.createClient({
    // 도커 환경이 아닐 때
    host:"redis-server",
    // host: "redis-server",
    port: 6379,
})
const app = express()

client.set("number", 0)


app.get('/', (req, res) => {
    client.get("number", (err, number) => {
        // 현재 숫자를 가져온 후에 1씩 올려준다.
        res.send("숫자가 1씩 올라감 숫자: "+ number)
        client.set("number", parseInt(number) + 1)
    })
})

app.listen(PORT, () => {
    console.log('Server running on port:'+PORT)
})