const { google } = require('googleapis')
const youtube = google.youtube('v3')

function buildAuth (encodedAuth) {
  const str = Buffer.from(encodedAuth, 'base64').toString()
  const data = JSON.parse(str)

  const auth = new google.auth.OAuth2(
    data._clientId,
    data._clientSecret,
    data.redirectUri
  )

  auth.credentials = data.credentials

  return auth
}

async function getLastLikedVideos () {
  const { data } = await youtube.videos.list({
    part: 'snippet,contentDetails,statistics',
    myRating: 'like'
  })

  const [lastLiked] = data.items
  console.log(lastLiked)
  return lastLiked
}

function setup (encodedAuth) {
  const auth = buildAuth(encodedAuth)
  google.options({ auth })
}

module.exports = {
  yt: {
    getLastLikedVideos,
    setup
  }
}
