const mongo = require('mongoose')
let MachLog = new mongo.Schema({
    id: String,
    Invite: String,
    Owner: String
})


module.exports = new mongo.model('MachLog', MachLog)