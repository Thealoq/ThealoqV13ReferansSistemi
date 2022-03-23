const { Discord, MessageEmbed, Collection } = require("discord.js");
const config = require("../settings.json");
const moment = require("moment");
require("moment-duration-format")
const main = require("../function/login");
const client = main.getClient()
moment.locale("tr");
const ms = require("ms")
let DataBase = new Collection()
const VoiceData = require('../models/VoiceData');
const DavetData = require("../models/DavetData");
exports.execute = async (oldState, newState) => {
  if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
  if ((oldState?.channelId) && (newState?.channelId)) {
    DataBase.set(oldState.member.id, Date.now())
  } else if ((oldState && oldState.channelId) && (newState && !newState.channelId)) {
    let veri = Date.now() - DataBase.get(oldState.member.id).toString()
    await VoiceData.findOneAndUpdate({ id: oldState.member.id }, { $inc: { second: Date.now() - DataBase.get(oldState.member.id) } }, { upsert: true })
    let Db = await VoiceData.findOne({ id: oldState.member.id })
    const channel = oldState.guild.channels.cache.find(channel => channel.name === "levelup");
    lvlcontrol(millisToMinutesAndSeconds(Db.second), oldState.member, channel)
    DataBase.delete(oldState.member.id)
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${oldState.member.user.username}#${oldState.member.user.discriminator}`)
      .setFooter(`💖 Thealoq Code`)
      .setTimestamp()
      .setThumbnail("https://cdn.discordapp.com/emojis/706229912364646421.gif?size=96&quality=lossless")
      .setDescription(`:star: ${oldState.member} durumun: **${millisToMinutesAndSeconds(Db.second)}** Toplam dakika oldu. \n 
     :tada: ${Cover(veri)}`)
    oldState.member.send({ embeds: [embed] })
      .then(() => { })
      .catch(() => {
        const channel = oldState.guild.channels.cache.find(channel => channel.name === "levelup");
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`${oldState.member.user.username}#${oldState.member.user.discriminator}`)
          .setFooter(`💖 Thealoq Code`)
          .setTimestamp()
          .setThumbnail("https://cdn.discordapp.com/emojis/706229912364646421.gif?size=96&quality=lossless")
          .setDescription(`:star: ${oldState.member} durumun: **${millisToMinutesAndSeconds(Db.second)}** Toplamdakika oldu. \n 
    :tada: ${Cover(veri)}`)
        channel.send({ embeds: [embed] })
      });
  }
};
exports.conf = {
  event: "voiceStateUpdate"
};
client.on("ready", () => {
  const guild = client.guilds.cache.get(config.guildID)
  guild.members.cache.map(member => {
    DataBase.set(member.id, Date.now())
  })
})
function Cover(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes
}
async function lvlcontrol(time, member) {
  if (time > 0 && time < 60) {
    if (!member.roles.cache.has(config.lvl1)) {
      member.roles.add(config.Voicelevel1).then(() => {
        member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Ses Sıralamasında 1** Seviyeye Ulaştin` }).catch(() => {
          const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
          thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
          thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Ses Sıralamasında 1** Seviyeye Ulaştin` })
        })
      })
    }
  } else if (time > 60 && time < 120) {
    member.roles.add(config.Voicelevel2).then(() => {
      member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **2** Seviyeye Ulaştin` }).catch(() => {
        const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
        thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
        thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Ses Sıralamasında 2** Seviyeye Ulaştin` })

      })
    })
  } else if (time > 120 && time < 180) {
    member.roles.add(config.Voicelevel3).then(() => {
      member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Ses Sıralamasında 3** Seviyeye Ulaştin` }).catch(() => {
        const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
        thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
        thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Ses Sıralamasında 3** Seviyeye Ulaştin` })
      })
    })
  } else if (time > 180 && time < 540) {
    member.roles.add(config.Voicelevel4).then(() => {
      member.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Ses Sıralamasında 4** Seviyeye Ulaştin` }).catch(() => {
        const thealoq = member.guild.channels.cache.find(channel => channel.name === "levelup")
        thealoq.send({ content: `${member}` }).then(msg => msg.delete({ timeout: 10000 }))
        thealoq.send({ content: `:tada: Tebrikler \`${member.guild.name}\` Sunucunda **Ses Sıralamasında 4** Seviyeye Ulaştin` })
      })
    })
  }
}

