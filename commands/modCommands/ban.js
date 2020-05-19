const Discord = require("discord.js")
module.exports = {
    name: 'ban',
    aliases: ['desterrar', 'expatriar','b'],
    description: 'destierra del server al wachin seleccionado',
    run: async (client, message, args) => {
        const channel = client.channels.cache.get('699038844460466206')
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes permisos para hacer esto.");
        let user = message.mentions.users.first();
        let member = message.guild.member(user);
        let reason = args.slice(22).join(" ");
        if (!user) return message.channel.send("Mencione un usuario.");
        if (user.id === message.author.id) return message.channel.send("No te puedes banear a ti mismo.");
        if (user.id === client.user.id) return message.channel.send("No puedes banearme.");
        if (!reason) reason = "No hay razón provista";
        member.ban(reason).then(() => {
        const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
	      .setAuthor(`O'Connor`, client.user.avatarURL())
	      .addFields(
          { name: 'Usuario baneado:', value: `${user}`, inline: true},
          { name: 'ID:', value: `${user.id}`, inline: true},
          { name: 'Moderador:', value: message.author.username},
          { name: 'Razon:', value: reason, inline: true},
          { name: 'Fecha:', value: message.createdAt.toLocaleString()}
        )
        channel.send(embed)
        }).catch(err => {
          message.reply("No he podido banear al miembro");
        })
    }
}