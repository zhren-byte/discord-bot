const Discord = require("discord.js");
module.exports = {
name: "svinfo",
aliases: [],
category: "modCommands",
description: "Command description",
usage: "[args input]",
   run: (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes los permisos necesarios.")
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
	    .setTitle('Informacion del servidor')
	    .setAuthor(`${message.guild.name}`, client.user.avatarURL())
      .addFields(
          { name: "**Guild Owner:**", value:`${message.guild.owner}`, inline: true},
          { name: "**Member Count:**", value: `${message.guild.memberCount}`, inline: true},
          { name: "**Role Count:**", value: `${message.guild.roles.cache.size}`, inline: true},
        )
      .addField('\u200b', `Usa \`help\` o \`@${client.user.tag} help\` para ver todos los comandos.\n\n`);
    message.author.send(embed);
  }
}