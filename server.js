const {Client, Collection} = require("discord.js");
const client = new Client();
const config = require("./config.js");
const fs = require("fs");
const db = require("megadb");
const {createCanvas, loadImage} = require('canvas');
let prefix_DB = new db.crearDB("prefix");

client.commands = new Collection();
client.on("ready", () => {
    console.log(`Estoy listo!, conectado en ${client.guilds.cache.size} servidores con ${client.users.cache.size} usuarios.`);
    client.user.setPresence({
      status: "online",
      activity: {
        name: `Eden.`,
        type: "WATCHING"
      }
    });
  });

  //logs
/*client.on("messageDelete", (message) => {
    let canal = client.channels.cache.get('693542385329635348'); 
    canal.send(`**${message.author.username}** elimino un mensaje con el contenido: ${message}`);
});*/
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 56;
	do {
		ctx.font = `${fontSize -= 10}px Buran USSR`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};
 //autoRole
client.on('guildMemberAdd', async member => {
    console.log('El usuario ' + member.user.tag + ' entro al servidor!');
    var autoRole = ('689255497148530701');
    member.roles.add(autoRole);
const channel = client.channels.cache.get('693542385329635348')
	if (!channel) return;
	//context
	if (!channel) return;
	const canvas = createCanvas(810, 250);
	const ctx = canvas.getContext('2d');
	const background = await loadImage('./welcome.jpg');
	ctx.globalAlpha =  1.0;
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = '#000000';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	//textName
	ctx.textAlign = 'center'
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Bienvenido ${member.displayName}!`, canvas.width / 1.77, canvas.height / 2.8);
	ctx.strokeStyle = '#000000';
	ctx.strokeText(`Bienvenido ${member.displayName}!`, canvas.width / 1.77, canvas.height / 2.8);
	//text
	ctx.font = '40px Buran USSR';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`sos el miembro ${member.guild.memberCount}th `, canvas.width / 1.77, canvas.height / 1.8);
	ctx.strokeStyle = '#000000';
	ctx.strokeText(`sos el miembro ${member.guild.memberCount}th `, canvas.width / 1.77, canvas.height / 1.8);
	//textServer
	ctx.font = '40px Broadway';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`de ${member.guild.name}`, canvas.width / 1.77, canvas.height / 1.34);
	ctx.strokeStyle = '#000000';
	ctx.strokeText(`de ${member.guild.name}`, canvas.width / 1.77, canvas.height / 1.34);
	//iconMember
	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();
	const avatar = await loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
	channel.send(`Bienvenido al servidor, ${member}!`, attachment);
});
client.on('message', message => {
	if (message.content === '!join') {
		client.emit('guildMemberAdd', message.member);
	}
});

/*let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    client.channels.cache.get("692985150144774164").send(x.join(" "));
});*/

client.on('message', async message => {
	if (message.author.bot) return;
	if(!message.guild) return;
	let prefix = prefix_DB.tiene(`${message.guild.id}`) ? await prefix_DB.obtener(`${message.guild.id}`) : "$"
    if (!message.content.startsWith(prefix)) return; 
	if (!message.member) message.member = await message.guild.fetchMember(message)
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	if(cmd.length === 0)return;
	let command = client.commands.get(cmd);
	
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	
	if(command){
      cmd.run(client, message, args)
	}



});

client.login(config.token);