const Discord = require("discord.js")
module.exports = {
name: "sugerencia",
aliases: ["s"],
category: "usersCommands",
description: "Command description",
usage: "[args input]",
   run: (client, message, args) => {
     let member = message.author.username;
     const channel = client.channels.cache.get('693542385329635348')
     const sugerencia = new Discord.MessageEmbed()
	        .setColor('#ff0000')
	        .setAuthor(`${member}`, message.user.avatarURL())
          .setDescription(args[0])
     channel.send(sugerencia)
  }
}