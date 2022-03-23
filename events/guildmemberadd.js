const { Discord, client, MessageEmbed } = require("discord.js");
const config = require("../settings.json");
exports.execute = async (member) => {
  const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
  channel.send(`:tada: **${member.guild.name}** Sunucunda Hoş Geldin **${member}**
  :bangbang: Sunucumza  Davet Yoluyla Geldiysen \`.verify\` Yazabilirsin.
   ${member.guild.emojis.cache.find(thealoq => thealoq.name === "boost")} Davete Sahip Değilsen \`.apply\` Yazabilirsin.`)

};
exports.conf = {
  event: "guildMemberAdd"
};
