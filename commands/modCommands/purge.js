module.exports = {
    name: "purge",
    aliases: ["clear", "nuke"],
    category: "modCommands",
    description: "Clears the chat",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You can't delete messages....").then(m => m.delete(5000));
        }
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Ese valor es invalido").then(m => m.delete(5000));
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("No puedo borrar mensajes, panflin.").then(m => m.delete(5000));
        }
        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }
        message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => {message.channel.send(`Acabo de borrar \`${deleted.size}\` mensajes.`).then(msg => msg.delete({ timeout: 5000 }))})
        .catch(err => {message.reply(`Hubo alto error amigo. ${err}`).then(msg => msg.delete({ timeout: 5000}))});
    }
}