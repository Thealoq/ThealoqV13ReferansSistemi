const mongo = require('mongoose')
let MessageData = new mongo.Schema({
    id: String,
    Point: Number,
})


module.exports = new mongo.model('MessageData', MessageData)