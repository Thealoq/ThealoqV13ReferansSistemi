const Discord = require("discord.js");
const config = require("../settings.json")
const main = require("../function/login")
const client = main.getClient()
const MessageData = require("../models/MessageData")
exports.execute = async (message) => {
    if (message.content.startsWith(config.prefix)) return
    if (message.author.bot) return;
    let Veri = await MessageData.findOne({ id: message.member.id })
    if (Veri) {
        Veri.Point += 1
        Veri.save()
        CheckPoint(Veri.Point, message.member)
    } else {
        await MessageData.create({ id: message.member.id, Point: 1 })
    }

};
exports.conf = {
    event: "messageCreate"
};

function CheckPoint(id, member) {
    if (id >= 100) {
        if (!member.roles.cache.has(config.Messagelevel1)) {
            member.roles.add(config.Messagelevel1).then(() => {
                member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 1** Seviyeye Ulaştin` }).catch(() => {
                    const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
                    thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
                    thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 1** Seviyeye Ulaştin` })
                })
            })
        }
    } else if (id >= 200) {
        if (!member.roles.cache.has(config.lvl1)) {
            member.roles.add(config.Messagelevel2).then(() => {
                member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 2** Seviyeye Ulaştin` }).catch(() => {
                    const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
                    thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
                    thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 2** Seviyeye Ulaştin` })
                    let Data =  DavetData.findOne({ id: message.member.id })
                    if (Data) {
                        Data.Point = 1
                        Data.save()
                    } else {
                        DavetData.create({ id: message.member.id, Point: 1 })
                    }
                })
            })
        }
    } else if (id >= 300) {
        if (!member.roles.cache.has(config.lvl1)) {
            member.roles.add(config.Messagelevel3).then(() => {
                member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 3** Seviyeye Ulaştin` }).catch(() => {
                    const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
                    thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
                    thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 3** Seviyeye Ulaştin` })
                })
            })
        }
    } else if (id >= 400) {
        if (!member.roles.cache.has(config.lvl1)) {
            member.roles.add(config.Messagelevel4).then(() => {
                member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 4** Seviyeye Ulaştin` }).catch(() => {
                    const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
                    thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
                    thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Mesaj Sıralamasında 4** Seviyeye Ulaştin` })
                    let Data =  DavetData.findOne({ id: message.member.id })
                    if (Data) {
                        Data.Point = ++
                        Data.save()
                    } else {
                        DavetData.create({ id: message.member.id, Point: 1 })
                    }
                })
            })
        }
    }
}



