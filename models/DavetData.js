const mongo = require('mongoose')

let DavetData = new mongo.Schema({
    id: String,
    Count: {
        type: Number,
        default: 0
    },
    Invites: Array,
})

module.exports = new mongo.model('DavetData', DavetData)