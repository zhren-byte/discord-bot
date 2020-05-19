const http = require('http');
const express = require('express');
const app = express();
//const { ErelaClient } = require('erela.js');

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`); 
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client({
    disableEveryone: true
})
const fs = require("fs");
const db = require("megadb");
let prefix_DB = new db.crearDB("prefix");
const {createCanvas, loadImage, registerFont} = require('canvas');
client.commands  = new Discord.Collection();
client.aliases = new Discord.Collection();
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});
//ready
client.on("ready", () => {
    console.log(`Estoy listo!, conectado en ${client.guilds.cache.size} servidores con ${client.users.cache.size} usuarios.`);
    client.user.setPresence({
      status: "online",
      activity: {
        name: `Los Simuladores`,
        type: "WATCHING"
      }
    });
  });
/*const { 
  registerCommands, 
  registerEvents,
  registerMusicEvents,
} = require('./utils/register');

(async () => {
  await client.login(process.env.TOKEN);
  client.music = new ErelaClient(client, [
    {
      host: process.env.HOST,
      port: process.env.PORT,
      password: process.env.PASSWORD
    }
  ]);
  client.commands = new Map();
  await registerMusicEvents(client.music, '../musicevents');
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
})();*/
//autoRole & welcome
client.on('guildMemberAdd', async member => {
    console.log('El usuario ' + member.user.tag + ' entro al servidor!');
    var autoRole = ('689255497148530701');
    member.roles.add(autoRole);
//orden
const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    let fontSize = 56;
    do {
        ctx.font = `${fontSize -= 10}px Buran USSR`;
    } while (ctx.measureText(text).width > canvas.width - 300);
        return ctx.font;
};
const channel = client.channels.cache.get('693542385329635348')
	if (!channel) return;
	//context
	if (!channel) return;
	const canvas = createCanvas(810, 250);
	const ctx = canvas.getContext('2d');
	const background = await loadImage('https://cdn.glitch.com/1274e970-fc06-412c-aa9e-daf3dbf8a89c%2Fwelcome.jpg?v=1587627738858');
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
      command.run(client, message, args)
	}
});
client.login(process.env.TOKEN)