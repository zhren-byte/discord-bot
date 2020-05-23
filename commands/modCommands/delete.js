const IGNORED = new Set([
  699038845462642748,
  699038847664914443,
  699038849686438038,
  699038850663841913,
  699038852437770280
  ]);
module.exports = {
  name: 'delete',
  description: 'deletea todos los canales re pilin jajajajajjadsjjasddhjnoaskdaskbjnklhasdfihocihdfashnijdasiihjdsajodasjoadsjojaksdjidasijujioadsjo',
  run: async(client, message, args) => {
    const fetchedChannel = message.guild.channels.find(r => r.name === args.join(' '));
     fetchedChannel.delete();
  }
}