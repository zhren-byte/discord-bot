const Discord = require("discord.js");
module.exports = {
name: "ping",
aliases: [],
category: "modCommands",
description: "Command description",
usage: "[args input]",
   run: async (client, message, args) => {
     const channel = client.channels.cache.get('699038844460466206')
     const embed = new Discord.MessageEmbed()
            .setColor('#ff0000')
	          .setAuthor(`O'Connor`, client.user.avatarURL())
	          .addFields(
              { name: 'Usuario kickeado:', value: `e`},
              { name: 'ID:', value: `e`},
              { name: 'Moderador:', value: `e`},
              { name: 'Razon:', value: `e`},
              { name: 'Fecha:', value: message.createdAt.toLocaleString()}
            )
            channel.send(embed)
    }
}