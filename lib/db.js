const { config } = require('../config')
const mongoose = require('mongoose')

async function connect (url = config.DATABASE_URL) {
  await mongoose.connect(url)
}

module.exports = {
  db: {
    connect
  }
}
