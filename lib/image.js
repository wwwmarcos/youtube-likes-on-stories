const axios = require('axios')
const sharp = require('sharp')

async function addBackground ({ fileBuffer }) {
  const resized = await sharp(fileBuffer)
    .rotate(90)
    .resize(1080)
    .toBuffer()

  return sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: { r: 0, g: 0, b: 0 }
    }
  })
    .composite([{
      input: resized,
      gravity: 'center'
    }])
    .jpeg()
    .toBuffer()
}

async function getRemoteBuffer (url) {
  const { data: file } = await axios.get(url, {
    responseType: 'arraybuffer'
  })

  return file
}

module.exports = {
  image: {
    getRemoteBuffer,
    addBackground
  }
}
