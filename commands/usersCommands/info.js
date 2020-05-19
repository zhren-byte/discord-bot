const Discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: [],
    category: "usersCommands",
    description: "Command description",
    usage: "[args input]",
    run: (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
	    .setTitle('Informacion del bot')
	    .setAuthor(`O'Connor`, client.user.avatarURL())
	    .addFields(
	    	{ name: 'ban', value: `${client.guilds.cache.size}`, inline: true},
            { name: 'unban', value: `${client.users.cache.size}`, inline: true},
            { name: 'mute', value: `${client.channels.cache.size}`, inline: true},
            { name: 'unmute', value: `${client.channels.cache.size}`, inline: true},
            { name: 'kick', value: `${client.channels.cache.size}`, inline: true},
            { name: 'say', value: `${client.channels.cache.size}`, inline: true},
            { name: 'mute', value: `${client.channels.cache.size}`, inline: true},
        )
        .addField('\u200b', `Usa \`help\` o \`@${client.user.tag} help\` para ver todos los comandos.\n\n`);
    message.author.send(embed);
    }
}