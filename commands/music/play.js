const ytdl = require('ytdl-core');
module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'pa pone musica',
  run: async (client, message, args) => {
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
    if(!args) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');
    voiceChannel.join()
      .then(connection => {
        const url = ytdl(args, { filter : 'audioonly' });
        const dispatcher = connection.playStream(url);
        message.channel.send('Reproduciendo ahora: '+ args);
        message.delete();
      })
      .catch(console.error);
  }
}