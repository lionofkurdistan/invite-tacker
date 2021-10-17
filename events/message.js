let config = require('./../config')
const db = require('quick.db')
const Discord = require("discord.js") , cooldowns = new Discord.Collection();
module.exports.run = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member.hasPermission ('ADMINISTRATOR')) {
    message.content.split (' ').forEach (m => {
    });
  }

  if (!message.content.startsWith (config.prefix)) return;

  if (!message.member)
    message.member = await message.guild.members.fetch (message);

  const args = message.content.slice (config.prefix.length).trim ().split (/ +/g);
  const cmd = args.shift ().toLowerCase ();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) ||  client.commands.find(command => command.aliases && command.aliases.includes(cmd));
  if (!command) command = client.commands.get (client.aliases.get (cmd));

  if (!command) return;
  if (command.botPermission) {
    let neededPerms = [];

    command.botPermission.forEach (p => {
      if (!message.guild.me.hasPermission (p)) neededPerms.push ('`' + p + '`');
    });
    let permissioa = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`
    Heyo, chill you dont have the required permissions to use this command

    (${neededPerms})
    `)
    .setColor(`2C2F33`)
    .setFooter( message.guild.name , client.user.displayAvatarURL())
    .setTimestamp()
    if (neededPerms.length) return message.channel.send(permissioa)
  }
  if(command.authorPermission) {
    let neededPerms = [];

    command.authorPermission.forEach (p => {
      if (!message.member.hasPermission (p)) neededPerms.push ('`' + p + '`');
    });

    if (neededPerms.length)
    return message.channel.send(permissioa)
  }

  if (command.ownerOnly) {
    if (!config.devs.includes (message.author.id))
      return;
  }
if(command.dmOnly) {
if(!message.channel.type === "dm") return ;

}

  if (!cooldowns.has(command.cooldowns)) cooldowns.set(command.cooldowns, new Discord.Collection());
  
  const member = message.member,
        now = Date.now(),
        timestamps = cooldowns.get(command.cooldowns),
        cooldownAmount = (command.cooldowns || 3) * 1000;
  var own = ["852219497763045398"]
  if (!timestamps.has(member.id)) {
    if (!own.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
    if (now < expirationTime) {

      const timeLeft = (expirationTime - now) / 1000;
      let cooldowna = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`
      Heyo, chill your on cooldown  
      (${timeLeft.toFixed(1)}s)
      `)
      .setColor(`2C2F33`)
      .setFooter( message.guild.name , client.user.displayAvatarURL())
      .setTimestamp()
  
      return message.channel.send(cooldowna);
    }
    
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount); // This will delete the cooldown from the user by itself.
  }
  if (command) command.run (client, message, args, db);
};
