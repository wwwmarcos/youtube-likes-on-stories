const { Router } = require('express')
const { postToInstagram } = require('./postToInstagram')

const like = Router()

like.get('/like/verify/ig', postToInstagram)

module.exports = {
  like
}
