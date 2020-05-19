const Discord = require("discord.js");
module.exports = {
name: "helpop",
aliases: [],
category: "modCommands",
description: "Command description",
usage: "[args input]",
   run: (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor(`O'Connor`, client.user.avatarURL())
    .addFields(
        { name: 'prefix', value: 'Consulta el prefix'},
        { name: 'setprefix <newPrefix>', value: 'Cambia el prefix del bot en tu servidor'},
        { name: 'coronavirus', value: 'Revisa los datos sobre el virus'},
        { name: 'say <things>', value: 'Da al bot algo para decir' },
        { name: 'helpop', value: 'Ver todos los comandos de administrador'}
    )
    .addField('\u200b', `Usa \`helpop\` o \`@${client.user.tag} helpop\` para ver todos los comandos especiales.\n\n`);
    message.author.send(embed);
  }
}