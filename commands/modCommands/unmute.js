const Discord = require('discord.js')
module.exports = {
  name: 'unmute',
  description: 'lo demutea al wachin muteado',
  run: async (client, message, args) => { 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes permisos para hacer esto.");
    let member = message.mentions.members.first();
    let role = message.guild.roles.cache.find(r => r.id == '699038816987775036')
    member.roles.remove(role).catch(console.error);
    const channel = client.channels.cache.get('693542385329635348')
    const embed = new Discord.MessageEmbed()
	        .setColor('#ff0000')
	        .setAuthor(`O'Connor`, client.user.avatarURL())
	        .addFields(
            { name: 'Miembro:', value: `${member} (${member.id})`},
            { name: 'Accion:', value: "Unban"},
            { name: 'Moderador:', value: message.author.username},
            { name: 'Fecha:', value: message.createdAt.toLocaleString()}
           )
    channel.send(embed)
  }
}