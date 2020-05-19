const { ErelaClient, Utils } = require ('erela.js');
const nodes = [
    {
        host: "localhost",
        port: 2333,
        password: "youshallnotpass",
    }
]
module.exports = client => {
    console.log(`${client.user.username} is online`);

    client.music = new ErelaClient(client, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Nuevo nodo creado."))
        .on("queueEnd", player => {
            player.textChannel.send('La lista ha finalizado')
            return client.music.players.destroy(player.guild.id)
        })
        .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => MessageChannel.delete))

    client.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);
}