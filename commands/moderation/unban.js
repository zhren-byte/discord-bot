const Discord = require("discord.js")
module.exports = {
    name: 'unban',
    aliases: ['pardon', 'desban'],
    description: 'desbanea al wachin desterrado',
    category: 'modCommands',
    run: async (client, message, args) => {
    const channel = client.channels.cache.get('675585949983440897')
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("No tienes permiso para utilizar este comando")
	  if(isNaN(args[0])) return message.channel.send("Proporcione una ID")
    let bannedMember = await client.users.fetch(args[0])
    if(!bannedMember) return message.channel.send("Use la id del usuario para desbanearlo!")
    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"
    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("No tengo permisos para desbanear a un usuario")
    message.delete()
    try {
        message.guild.members.unban(bannedMember, reason)
        const embed = new Discord.MessageEmbed()
	        .setColor('#ff0000')
	        .setAuthor(`O'Connor`, client.user.avatarURL())
          .setDescription(`**Miembro:** ${bannedMember} (${bannedMember.id})\n **Accion:** Un-Ban\n **Moderador:** ${message.author.username}`)
          .setTimestamp()
        channel.send(embed)
    } catch(e) {
        console.log(e.message)
    }
  }
}