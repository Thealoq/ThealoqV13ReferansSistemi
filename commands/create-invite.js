const { Client, Intents, Message, MessageEmbed, MessageActionRow, MessageButton, Collection } = require('discord.js');
const config = require("../settings.json")
const DavetData = require("../models/DavetData")
exports.execute = async (client, message, args) => {
    let Data = await DavetData.findOne({ id: message.member.id })
    if (!Data) {
        let newData = new DavetData({
            id: message.member.id,
            davet: 0
        })
        newData.save().catch(e => console.error(e))
        message.reply(`Davet Hakkınız Bulunmuyor`)
    } else {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Olustur')
                    .setEmoji(`${message.guild.emojis.cache.find(thealoq => thealoq.name === "onay")}`)
                    .setStyle('SECONDARY'))
            .addComponents(
                new MessageButton()
                    .setCustomId('info')
                    .setEmoji(`${message.guild.emojis.cache.find(thealoq => thealoq.name === "infor")}`)
                    .setStyle('SECONDARY'))
            .addComponents(
                new MessageButton()
                    .setCustomId('iptal')
                    .setEmoji(`${message.guild.emojis.cache.find(thealoq => thealoq.name === "x_")}`)
                    .setStyle('SECONDARY'))
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${message.member.user.username}#${message.member.user.discriminator}`)
            .setFooter(`💖 Thealoq Code`)
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/emojis/931966112881577984.gif?size=96&quality=lossless")
        message.reply({
            embeds: [embed.setDescription(`Davet Kodu Oluşturmak İçin ${message.guild.emojis.cache.find(thealoq => thealoq.name === "onay")} Tıklıyabilirsiniz
        \n veya ${message.guild.emojis.cache.find(thealoq => thealoq.name === "infor")}  Tıklıyarak Kaç Davet Hakkın Olduğunu öğrebilirsiniz`)], components: [row]
        })

    }

    const filter = i => i.user.id === message.member.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });
    collector.on('collect', async b => {
        if (b.isButton()) {
            if (b.customId === "iptal") {
                message.delete();
                message.channel.send('İşlem iptal edildi')
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000);
                    });
            } if (b.customId === "info") {
                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${message.member.user.username}#${message.member.user.discriminator}`)
                    .setFooter(`💖 Thealoq Code`)
                    .setTimestamp()
                    .setThumbnail("https://cdn.discordapp.com/emojis/931966112881577984.gif?size=96&quality=lossless")
                message.channel.send({ embeds: [embed.setDescription(`Davet Hakkınız: ${Data.Count}`)] })
            }
            if (b.customId === "Olustur") {
                if (Data && Data.Count === 0) {
                    message.reply(`Davet Hakkınız Bulunmuyor`)
                } else {
                    let code = randomString(6)
                    message.channel.send(`Davet Kodunuz Başariyla Oluşturuldu ve dm'den gönderildi`)
                    message.member.send(`Davet Kodunuz: ${code}`).catch(e => {
                        message.channel.send(`Davet Kodunuz Başariyla Oluşturuldu Fakat DM'ye Gönderilemedi`)
                    })
                    if (Data) {
                        Data.Count--
                        Data.Invites.push(code)
                        Data.save()
                    }
                }
            }
            collector.stop()
            b.message.delete().catch(e => { console.error(e) })
        }
    })

}
exports.conf = {
    command: "create-invite",
    description: "",
    aliases: []
}


function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
