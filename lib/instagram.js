const { IgApiClient } = require('instagram-private-api')
const { StickerBuilder } = require('instagram-private-api/dist/sticker-builder')

const ig = new IgApiClient()

function buildStickerConfig ({ caption }) {
  const stickerConfig = new StickerBuilder().add(
    StickerBuilder.slider({
      question: caption,
      emoji: '🍆'
    }).scale(1)
    .center()
    .bottom(),
  )

  return stickerConfig
}

async function publishStory ({ file, caption }) {
  const stickerConfig = buildStickerConfig({
    caption
  })

  return ig.publish.story({
    file,
    toBesties: true,
    caption,
    stickerConfig
  })
}

async function login ({ user, password }) {
  ig.state.generateDevice(user)
  await ig.qe.syncLoginExperiments()
  await ig.account.login(user, password)
}

module.exports = {
  ig: {
    login,
    publishStory
  }
}
