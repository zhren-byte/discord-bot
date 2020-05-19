const db = require("megadb");
let warns_db = new db.crearDB("warns");
const Discord = require("discord.js");
module.exports = {
    name: 'warn',
    aliases: ['w', 'adv'],
    description: 'destierra del server al wachin seleccionado',
    run: async (client, message, args) => {
        var prms = message.member.hasPermission("KICK_MEMBERS")
        let warneado = message.mentions.users.first();
        let razon = args.slice(1).join(" ");
        if(!prms) return message.channel.send("No tienes permiso para usar este comando.");
        if(!warneado) return message.channel.send("Debes de mencionar a un usuario, **?advertir** `<@usuario>` `<razón>`");
        if(!razon) return message.channel.send("No hay razon.");
        if(!warns_db.tiene(`${message.guild.id}.${warneado.id}`)){
        warns_db.establecer(`${message.guild.id}.${warneado.id}`, 0)
        warns_db.sumar(`${message.guild.id}.${warneado.id}`, 1)
        warneado.warns(razon).then(() => {
        const channel = client.channels.cache.get('699038844460466206')
        const embed = new Discord.MessageEmbed()
	        .setColor('#ff0000')
	        .setAuthor(`O'Connor`, client.user.avatarURL())
	        .addFields(
            { name: 'Usuario warneado:', value: warneado, inline: true},
            { name: 'ID:', value: warneado.id, inline: true},
            { name: 'Moderador:', value: message.author.username},
            { name: 'Razon:', value: razon},
            { name: 'Fecha:', value: message.createdAt.toLocaleString()}
         )
        channel.send(embed)
        }).catch(err => {
          message.reply("No warnee al miembro");
        })
    }         
  }
}