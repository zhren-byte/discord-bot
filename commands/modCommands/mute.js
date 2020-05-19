const Discord = require("discord.js")
module.exports = {
  name: 'mute',
  description: 'se le asigna el rol de muteado al wachin porque juy todavia no sabe como hacer para que tengamos que elegir el rol jaja',
  aliases: ['silenciar', 'enmudecer'],
  run: async (client, message, args) => { 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes permisos para hacer esto.");
    let member = message.mentions.members.first();
    let role = message.guild.roles.cache.find(r => r.id == '699038816987775036')
    member.roles.add(role).catch(console.error);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No hay razón provista."
    const channel = client.channels.cache.get('699038844460466206')
    const embed = new Discord.MessageEmbed()
	    .setColor('#ff0000')
	    .setAuthor(`O'Connor`, client.user.avatarURL())
	    .addFields(
        { name: 'Usuario muteado:', value: member, inline: true},
        { name: 'ID:', value: member.id, inline: true},
        { name: 'Moderador:', value: message.author.username},
        { name: 'Razon:', value: reason},
        { name: 'Fecha:', value: message.createdAt.toLocaleString()}
      )
      channel.send(embed)
  }
}
  
