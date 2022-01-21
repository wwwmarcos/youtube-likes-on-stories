const { yt } = require('./lib/youtube')
const { config } = require('./config')
const express = require('express')
const { like } = require('./src/like/routes')
const { db } = require('./lib/db')

yt.setup(config.ENCODED_GOOGLE_AUTH)
db.connect()

const app = express()

app.use(like)

app.listen(config.PORT,
  () => console.log(`running on ${config.PORT}`)
)
