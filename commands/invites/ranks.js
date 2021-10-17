const Discord = require("discord.js")
// const translate = require("translate-google")
const config = require('../../config.js')

module.exports = {
name: "ranks",
aliases:['ranking', 'rank'],
description: "show guild rank roles",
usage: `ginvites [none/@user]`,
category: "invites",
botPermission: [],
authorPermission: [],
cooldowns: 3,
ownerOnly: false,
dmOnly:false,
run: async (client, message, args, db) => {
let data = db.get(`ranks_${message.guild.id}`)
if(!data) return message.channel.send(`Guild doesn't have any rank rewards`)
if(data.length < 0) return message.channel.send(`Guild doesn't have any rank rewards`)
if(data === null) return message.channel.send(`Guild doesn't have any rank rewards`)
if(data < 2) return message.channel.send(`Guild doesn't have any rank rewards`);
if(data && data.length) {
let arr = []
    data.forEach( x=> {
let = datad = {
    role: message.guild.roles.cache.get(x.role).name || 'Deleted Role'
    ,
    invites: x.invites
}
arr.push(datad)
    })
   
    arr.sort(function(a, b) {
        return parseFloat(a.invites) - parseFloat(b.invites);
    });
    let pog = []
arr.forEach(x => {
    pog.push(`${x.role} : ${x.invites} **Invites**`)
})  

    let embed = new Discord.MessageEmbed()
    .setTitle(`Guild Invite ranks`)
    .setDescription(pog.join("\n"))
    .setFooter(message.guild.name  , message.guild.iconURL())
    .setTimestamp();
return message.channel.send(embed)
}
}
}