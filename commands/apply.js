const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const config = require("../settings.json")
const ApplyData = require("../models/ApplyData")
exports.execute = async (client, message, args) => {
    const filter = m => m.author.id === message.author.id
    const collector = message.channel.createMessageCollector({ filter, time: 15000 });

    message.channel.send("Lütfen İsminizi Yazınız")
    collector.on('collect', m => {
        if(m.content.length < 0) {
            collector.stop()
        } 
        if(m.content.length > 1) {
            message.channel.send(`${m.content} İsimli Kullanıcının Adını ${m.content}`)
            message.member.setNickname(`${m.content}`)
            collector.stop()
        }
    });

    // en yakında bu komutu yapıcam fakat başka projeler olduğu için burda burakiyorum güncelliycem
    
    collector.on('end', collected => {
        console.log(`Collected ${collected.size} items`);
    });

}
exports.conf = {
    command: "apply",
    description: "",
    aliases: []
}

