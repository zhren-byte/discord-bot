
const Discord = require('discord.js')
const { Utils } = require("erela.js")
module.exports = { 
  name: "play",
  description: "Play a song/playlist or search for a song from youtube",
  aliases: ["p", "pplay"],
  run: async (client, message, args) => {
const channel = message.member.voice.channel;
    if(!channel) return message.channel.send("You're required to be in a voice channel.");
    if(!args[0]) return message.channel.send("Don't forget to specify a song name or link.");
    const player = client.music.players.spawn({
        guild: message.guild,
        textChannel: message.channel,
        channel
    });
    client.music.search(args.join(" "), message.author).then(async res => {
        switch(res.loadType){
            case "TRACK_LOADED":
                player.queue.add(res.tracks[0])
                message.channel.send(`Queueing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``)
                if(!player.playing) player.play()
                break;
            case "SEARCH_RESULT":
                let index = 1;
                const tracks = res.tracks.slice(0, 5);
                const embed = new Discord.MessageEmbed()
                .setAuthor("Song Selection", message.author.displayAvatarURL())
                .setDescription(tracks.map(video => `*${index++} -* ${video.title}`))
                .setFooter("You have 30 seconds to choose, type 'cancel' to cancel the selection.");
                await message.channel.send(embed);
                const collector = message.channel.createMessageCollector(m => {
                    return m.author.id === message.author.id && new RegExp(`^([1-5]cancel)$`, "1").test(m.content)
                }, { time: 30000, max: 1 });
                collector.on("collect", m => {
                    if(/cancel/i.test(m.content)) return collector.stop("cancelled")
                    const track = tracks[Number(m.content) - 1];
                    player.queue.add(track);
                    message.channel.send(`Queueing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``)
                    if(!player.playing) player.play();
                });
                collector.on("end", (_, reason) => {
                    if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled the selection.")
                });
                break;
                case "PLAYLIST_LOADED":
                    res.playlist.tracks.forEach(track => player.queue.add(track));
                    const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})), true);
                    message.channel.send(`Queueing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
                    if(!player.playing) player.play()
                    break;
            }
        }).catch(err => message.channel.send(err.message))
    }
}