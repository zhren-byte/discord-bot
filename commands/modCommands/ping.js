const Discord = require("discord.js");
module.exports = {
name: "ping",
aliases: [],
category: "modCommands",
description: "Command description",
usage: "[args input]",
   run: async (client, message, args) => {
     const channel = client.channels.cache.get('693542385329635348')
     const embed = new Discord.MessageEmbed()
	        .setColor('#ff0000')
	        .setAuthor(`O'Connor`, client.user.avatarURL())
          .setDescription(`**Miembro:** ${message.author}\n **Accion:** Auto-Mute\n **Moderador:** O'Connor\n **Fecha:** ${message.createdAt.toLocaleString()} `)
      channel.send(embed)
    }
}