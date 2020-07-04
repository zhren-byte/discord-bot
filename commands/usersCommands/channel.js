const db = require("megadb");
let channel_DB = new db.crearDB("channel");
module.exports = {
name: "channel",
aliases: [],
category: "modCommands",
description: "Command description",
usage: "[args input]",
   run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes los permisos necesarios.")
    /*if(!args[0]) return message.channel.send("Escribe un prefix")*/
    channel_DB.establecer(`${message.guild.id}`, args[0])
    return message.channel.send("`El canal a sido cambiado a:`"+args[0])
    }
}