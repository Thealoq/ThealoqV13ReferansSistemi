global.__baseDir = __dirname
const main = require("./function/login")
const client = main.getClient()
const moment = require("moment")
const { Collection } = require("discord.js");
const Handle = require('./function/Handler.js')
const { token, url } = require("./settings.json")

client.channelLimit = new Map();
client.commands = new Collection();
client.aliases = new Collection();

let HanDll = new Handle()
HanDll.GetEvents(client)
HanDll.GetCommands(client)
main.botLogin(token)
main.connectMongo(url);

