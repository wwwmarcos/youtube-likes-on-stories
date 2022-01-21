const { yt } = require('../../lib/youtube')
const { image } = require('../../lib/image')
const { ig } = require('../../lib/instagram')
const { Video } = require('./video')
const { config } = require('../../config')

async function registerPublishedVideo({ title, youtubeId, etag }) {
  await Video.create({
    etag,
    youtubeId,
    title
  })
}

async function isAlreadyPublished(youtubeId) {
  const video = await Video.findOne({
    youtubeId
  })

  return !!video
}

function getThumbnail(video) {
  const { thumbnails } = video.snippet
  const keys = Object.keys(thumbnails)
  const lastVideoKey = keys.pop()
  return thumbnails[lastVideoKey].url
}

async function postToInstagram(req, res) {
  try {
    const lastLikedVideo = await yt.getLastLikedVideos()

    if (await isAlreadyPublished(lastLikedVideo.id)) {
      return res.send({ message: 'nothing to publish' })
    }

    await ig.login({
      user: config.INSTAGRAM.LOGIN,
      password: config.INSTAGRAM.PASSWORD
    })

    const thumbUrl = getThumbnail(lastLikedVideo)
    const fileBuffer = await image.getRemoteBuffer(thumbUrl)
    const imageWithBackground = await image.addBackground({ fileBuffer })
    const videoTitle = lastLikedVideo.snippet.title

    await ig.publishStory({
      file: imageWithBackground,
      caption: videoTitle
    })

    await registerPublishedVideo({
      title: videoTitle,
      etag: lastLikedVideo.etag,
      youtubeId: lastLikedVideo.id
    })

    return res.send({
      message: `${videoTitle} published to status`
    })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ error: true, message: error.message || 'error' })
  }
}

module.exports = {
  postToInstagram
}
