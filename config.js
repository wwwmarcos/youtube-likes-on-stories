require('dotenv').config()

const config = {
  PORT: 3000,
  ENCODED_GOOGLE_AUTH: process.env.ENCODED_GOOGLE_AUTH,
  DATABASE_URL: process.env.DATABASE_URL,
  INSTAGRAM: {
    LOGIN: process.env.INSTAGRAM_LOGIN,
    PASSWORD: process.env.INSTAGRAM_PASSWORD
  }
}

module.exports = {
  config
}
