const Discord = require("discord.js")
module.exports = {
name: "darole",
aliases: ["dr"],
category: "usersCommands",
description: "Command description",
usage: "[args input]",
   run: (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes permisos para hacer esto.");
    let member = message.mentions.members.first();
    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
      member.roles.add(role).catch(console.error);
  }
}