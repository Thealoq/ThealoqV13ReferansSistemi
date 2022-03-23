const mongo = require('mongoose')

let ApplyData = new mongo.Schema({
    id: String,
    Name: String,
    Age: String,
    reply: String,
})

module.exports = new mongo.model('ApplyData', ApplyData)