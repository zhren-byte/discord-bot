const db = require("megadb");
let prefix_DB = new db.crearDB("prefix");
module.exports = {
name: "prefix",
aliases: [],
category: "modCommands",
description: "Command description",
usage: "[args input]",
   run: async (client, message, args) => {
    if(!args[0]) return message.channel.send("`Prefix actual:`"+ await prefix_DB.obtener(`${message.guild.id}`))
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes los permisos necesarios.")
    if(!args[0]) return message.channel.send("Escribe un prefix")
    prefix_DB.establecer(`${message.guild.id}`, args[0])
    return message.channel.send("`El prefix a sido cambiado a:`"+args[0])
    }
}