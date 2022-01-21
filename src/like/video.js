const { Schema, model } = require('mongoose')

const videoSchema = new Schema({
  etag: String,
  youtubeId: String,
  title: String
}, {
  timestamps: true
})

const Video = model('Video', videoSchema)

module.exports = {
  Video
}
