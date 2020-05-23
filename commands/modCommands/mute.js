const Discord = require("discord.js")
module.exports = {
  name: 'mute',
  description: 'se le asigna el rol de muteado al wachin porque juy todavia no sabe como hacer para que tengamos que elegir el rol jaja',
  aliases: ['silenciar', 'enmudecer'],
  run: async (client, message, args) => { 
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes permisos para hacer esto.");
    let member = message.mentions.members.first();
    let role = message.guild.roles.cache.find(r => r.id == '691040456758394941')
    member.roles.add(role).catch(console.error);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No hay razón provista."
    const channel = client.channels.cache.get('693542385329635348')
    const embed = new Discord.MessageEmbed()
	        .setColor('#ff0000')
	        .setAuthor(`O'Connor`, client.user.avatarURL())
          .setDescription(`**Miembro:** ${member} (${member.id})\n **Accion:** Mute\n**Razon:** ${reason}\n **Moderador:** ${message.author.username}`)
          .setTimestamp()
    channel.send(embed)
  }
}
  
