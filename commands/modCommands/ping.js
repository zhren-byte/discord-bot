const Discord = require("discord.js");
module.exports = {
name: "ping",
aliases: [],
category: "modCommands",
description: "Command description",
usage: "[args input]",
   run: async (client, message, args) => {
     const channel = client.channels.cache.get('693542385329635348')
     channel.send("o!sugerencia Hola")
    }
}