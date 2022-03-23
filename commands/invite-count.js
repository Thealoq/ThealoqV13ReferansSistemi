const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const config =  require("../settings.json")
const DavetData = require("../models/DavetData")
exports.execute = async (client, message, args) => {
 let Data = await DavetData.findOne({id: message.member.id})
 if(!Data) {
     let newData = new DavetData({
         id: message.member.id,
         davet: 0
     })
     newData.save().catch(e => console.error(e))
 } else {
    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`${message.member.user.username}#${message.member.user.discriminator}`)
    .setFooter(`💖 Thealoq Code`)
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/emojis/931966112881577984.gif?size=96&quality=lossless")
    message.reply({ embeds: [embed.setDescription(`${Data.Count} Hakkınız Kaldı`)] })
 }

}
exports.conf = {
  command: "invite-count",
  description: "",
  aliases: []
}
