const Discord = require("discord.js")
module.exports = {
    name: 'kick',
    aliases: ['k', 'expulsar'],
    category: 'modCommands', 
    description: 'expulsa a un wachin seleccionado',
    run: async (client, message, args) => {
        const channel = client.channels.cache.get('693542385329635348')
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes permisos para hacer esto.");
        let user = message.mentions.users.first();
        let member = message.guild.member(user);
        let reason = args.slice(1).join(" ");
        if (!user) return message.channel.send("Menciona al usuario.")
        if (user.id === message.author.id) return message.channel.send("No te puedes expulsar a ti mismo.")
        if (user.id === client.user.id) return message.channel.send("No puedes expulsarme.")
        if (!reason) reason = "No hay razón provista."
        member.kick(reason).then(() => {
        const embed = new Discord.MessageEmbed()
	        .setColor('#ff0000')
	        .setAuthor(`O'Connor`, client.user.avatarURL())
          .setDescription(`**Miembro:** ${member} (${member.id})\n **Accion:** Kick\n**Razon:** ${reason}\n **Moderador:** ${message.author.username}`)
          .setTimestamp()
        channel.send(embed)
        }).catch(err => {
          message.reply("No he podido expulsar al miembro.")
        })
      }
}