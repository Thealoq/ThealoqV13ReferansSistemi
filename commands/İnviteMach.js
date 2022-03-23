const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const config = require("../settings.json")
const DavetData = require("../models/DavetData")
const MachData = require("../models/MachLog")
exports.execute = async (client, message, args) => {
    let Data = await DavetData.find()
    let invites = await Data.map(e => e)
    console.log(invites)
    let code = args.slice(0)[0]
    let newArray = invites.filter(c => {
        if(c.length > 0) {
            if(c.code == code) {
                return c
            }
        }
    })
    DavetData.deleteOne({Invites: code}).catch(e => console.error(e))
    await DavetData.findOneAndUpdate({}, {$set: {Invites: newArray}})
    let condi = Data.map((e) => e.Invites == code) 
       if(condi) {
            message.member.roles.add(config.member)
            message.channel.send("Başarili")
       } else {
              message.channel.send("Hata")
       }
}

exports.conf = {
    command: "verify",
    description: "",
    aliases: []
}
