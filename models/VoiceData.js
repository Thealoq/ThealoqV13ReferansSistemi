const mongo = require('mongoose')
let VoiceData = new mongo.Schema({
    id: String,
    second: Number,
    Level: Number,
})


module.exports = new mongo.model('VoiceData', VoiceData)