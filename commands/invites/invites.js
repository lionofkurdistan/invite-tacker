const Discord = require("discord.js")
// const translate = require("translate-google")
const config = require('../../config.js')

module.exports = {
name: "invites",
aliases:['inv', 'myinvites', 'myinvite'],
description: "shows your/user invites",
usage: `ginvites [none/@user]`,
category: "invites",
botPermission: [],
authorPermission: [],
cooldowns: 3,
ownerOnly: false,
dmOnly:false,
run: async (client, message, args, db) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
  let invites = db.get(`invites_${message.guild.id}_${user.id}`)
    if(user.id === message.author.id) {
      if(!invites) {
        let data = {
          invites: 0,
          regular: 0,
          leaves: 0,
          joins: 0,
          by: null,
          bouns: 0       
        }
        db.set(`invites_${message.guild.id}_${user.id}`, data)
        let embed = new Discord.MessageEmbed()
        .setAuthor(user.username , user.displayAvatarURL())
        .setTitle(`Your Invites`)
        .setDescription(`0 Invites (0 Regular 0 Leaves 0 bouns)`)
        .setFooter(message.guild.name  , message.guild.iconURL())
        .setTimestamp();
        return message.channel.send(embed)
      
      }
  let embed = new Discord.MessageEmbed()
  .setAuthor(user.username , user.displayAvatarURL())
  .setTitle(`Your Invites`)
  .setDescription(`${invites.invites || '0'} Invites (${invites.regular || '0'} Regular ${invites.leaves || '0'} Leaves ${invites.bouns || '0'} bouns)`)
  .setFooter(message.guild.name  , message.guild.iconURL())
  .setTimestamp();
  return message.channel.send(embed)
    }
    if(!invites) {
      let data = {
        invites: 0,
        regular: 0,
        leaves: 0,
        joins: 0,
        by: null,
        bouns: 0   
      }
      db.set(`invites_${message.guild.id}_${user.id}`, data)
      let embed = new Discord.MessageEmbed()
      .setAuthor(user.username , user.displayAvatarURL())
      .setTitle(`Your Invites`)
      .setDescription(`0 Invites (0 Regular 0 Leaves 0 bouns)`)
      .setFooter(message.guild.name  , message.guild.iconURL())
      .setTimestamp();
      return message.channel.send(embed)
    }
    let embed = new Discord.MessageEmbed()
    .setAuthor(user.username , user.displayAvatarURL())
    .setTitle(`${user.username} Invite's`)
    .setDescription(`${invites.invites || '0'} Invites (${invites.regular || '0'} Regular ${invites.leaves || '0'} Leaves ${invites.bouns || '0'} bouns)`)
    .setFooter(message.guild.name  , message.guild.iconURL())
    .setTimestamp();
    return message.channel.send(embed)
}
}