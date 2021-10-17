const express = require('express');
const app = express();
const port = 3000;
 
app.get('/', (req, res) => res.send('Hello World!'));
 
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
const Discord = require('discord.js')
const client = new Discord.Client()
const db = require('quick.db')
 const fs = require("fs");
 const prettyMilliseconds = require('pretty-ms');
const config = require('./config.js');
const { doesNotReject } = require('assert');
 
client.login(config.token)
client.on('ready', () => {
    console.log(`Running on ${client.user.username}`)
  setInterval(() => {
    client.user.setActivity(`!help , ${client.guilds.cache.size} Servers`, {
        type: "WATCHING"
   });      
}, 30000);
})


   
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

setInterval(() => { 
let ids = db.get(`rolereq`)
if(!ids) return;
ids.forEach(x => {
  let grole = db.get(`rolegiveaway_${x.message}`)
   if(!grole) return;
 let guild =  client.guilds.cache.get(grole.guild)
if(grole === null) return;
 if(!guild) return;
let channel =  guild.channels.cache.get(grole.channel)
if(!channel) return;
let test = grole.time-5000
let omg = grole.time
 if(omg < 5000) {
  if(grole === null) return;
 channel.messages.fetch(grole.messagename).then(async m => {
   m.edit(`🎉 *** GIVEAWAY ENDED *** 🎉`)
 })
 channel.messages.fetch(grole.message).then(async a => {
  if (a.reactions.cache.get('🎉').count < 1) {
    let ended = new Discord.MessageEmbed()
.setAuthor(`${grole.prize}`, guild.iconURL())
.setDescription(`Winners: No one entered the giveaway`)
.setColor(`2C2F33`)
.setFooter(`${grole.winners} Winners` , client.user.displayAvatarURL())  
a.edit(ended)
db.delete(`rolegiveaway_${x.message}`)
return;
}
let arr = []
   if (!a.reactions.cache.get('🎉').count < 1) {
    for (let i = 0; i < grole.winners; i++) {
      let users = await a.reactions.cache.get("🎉").users.fetch();
      let list = users.array().filter(u => u.id !== client.user.id);
      let winners = list[Math.floor(Math.random() * list.length) + 0]
arr.push(`${winners}`)  
    }
    channel.send(`${arr} Won ${grole.prize} ${a.url}`)
 
   let ended = new Discord.MessageEmbed()
  .setAuthor(`${grole.prize}`, guild.iconURL())
  .setDescription(`Winners: ${arr}`)
  .setColor(`2C2F33`)
  .setFooter(`${grole.winners} Winners` , client.user.displayAvatarURL())  
  a.edit(ended)
  db.delete(`rolegiveaway_${x.message}`)
   return;
   } 
})
return;
}
channel.messages.fetch(grole.message).then(a => {
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${grole.prize}`, guild.iconURL())
  .setDescription(`React With 🎉 To Enter\n ${prettyMilliseconds(test)}\nHosted By: <@${grole.by}>\nMust Have ${guild.roles.cache.get(grole.role).name || 'Role Not Found'} to enter.`)
  .setColor(`2C2F33`)
  .setFooter(`${grole.winners} Winners` , client.user.displayAvatarURL())  
  a.edit(embed)
 })

setTimeout(() => {
  let data = {
    prize: grole.prize,
    time: grole.time-5000,
    winners: grole.winners,
    by: grole.by,
    channel: grole.channel,
    role: grole.role,
    guild: grole.guild,
    message: grole.message,
    messagename: grole.messagename
  }
  db.set(`rolegiveaway_${x.message}`, data)
 }, 1000);
});
}, 5000)
setInterval(() => {
let ids  = db.get(`normalids`)
if(!ids) return;
ids.forEach(x => {
  let normalgiveaway = db.get(`normalgiveaway_${x.message}`)
  if(!normalgiveaway) return;
  let guild =  client.guilds.cache.get(normalgiveaway.guild)
  if(normalgiveaway === null) return;
  let test = normalgiveaway.time-5000
let channel = guild.channels.cache.get(normalgiveaway.channel)
if(!channel) return;
  if(test < 5000) {
    if(normalgiveaway === null) return;
    channel.messages.fetch(normalgiveaway.messagename).then(async m => {
      m.edit(`🎉 *** GIVEAWAY ENDED *** 🎉`)
    })
    channel.messages.fetch(normalgiveaway.message).then(async a => {
     if (a.reactions.cache.get('🎉').count < 1) {
       let ended = new Discord.MessageEmbed()
   .setAuthor(`${normalgiveaway.prize}`, guild.iconURL())
   .setDescription(`Winners: No one entered the giveaway`)
   .setColor(`2C2F33`)
   .setFooter(`${normalgiveaway.winners} Winners` , client.user.displayAvatarURL())  
   a.edit(ended)
   db.delete(`normalgiveaway_${x.message}`)
   return;
   }
   let arr = []
      if (!a.reactions.cache.get('🎉').count < 1) {
       for (let i = 0; i < normalgiveaway.winners; i++) {
         let users = await a.reactions.cache.get("🎉").users.fetch();
         let list = users.array().filter(u => u.id !== client.user.id);
         let winners = list[Math.floor(Math.random() * list.length) + 0]
   arr.push(`${winners}`)  
       }
       channel.send(`${arr} Won ${normalgiveaway.prize} ${a.url}`)
    
      let ended = new Discord.MessageEmbed()
     .setAuthor(`${normalgiveaway.prize}`, guild.iconURL())
     .setDescription(`Winners: ${arr}`)
     .setColor(`2C2F33`)
     .setFooter(`${normalgiveaway.winners} Winners` , client.user.displayAvatarURL())  
     a.edit(ended)
     db.delete(`normalgiveaway_${x.message}`)
      return;
      } 
   })
   return;   
  }
  channel.messages.fetch(normalgiveaway.message).then(a => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${normalgiveaway.prize}`, guild.iconURL())
    .setDescription(`React With 🎉 To Enter\n ${prettyMilliseconds(test)} \nHosted By: <@${normalgiveaway.by}>`)
    .setColor(`2C2F33`)
    .setFooter(`${normalgiveaway.winners} Winners` , client.user.displayAvatarURL())  
    a.edit(embed)
  })
 setTimeout(() => {
  let data = {
    prize: normalgiveaway.prize,
    time: normalgiveaway.time-5000,
    winners: normalgiveaway.winners,
    by: normalgiveaway.by,
    channel: normalgiveaway.channel,
     guild: normalgiveaway.guild,
    message: normalgiveaway.message,
    messagename: normalgiveaway.messagename
   }
   console.log(data)
  db.set(`normalgiveaway_${x.message}`, data)
 }, 1000);
}) 

}, 5000)

client.on('messageReactionAdd', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  let grole = await db.get(`rolegiveaway_${reaction.message.id}`)
  if(!grole) return;

  if(reaction.message.id == grole.message && reaction.emoji.name == `🎉`) {
  if(user.id === client.user.id) return;
  reaction.message.guild.members.fetch(user).then(member => {
    let test = setInterval((async) => {
       if(grole === null) return clearInterval(test);
      if(member.roles.cache.has(grole.role)) {
        return;
      }
      if(!member.roles.cache.has(grole.role)) {
    reaction.users.remove(user.id);
    return;
      }
    }, 3000);  

    if(member.roles.cache.has(grole.role)) {
      let embed = new Discord.MessageEmbed()
      .setAuthor(reaction.message.guild.name, reaction.message.guild.iconURL())
      .setDescription(`
      Entry Aprooved!
      
      **You've Agrred by reaction to be dmed.**`)
      .setColor(`GREEN`)
      .setFooter(client.user.username , client.user.displayAvatarURL())  
    return user.send(embed) 
    } else {
      let embedf = new Discord.MessageEmbed()
      .setAuthor(reaction.message.guild.name, reaction.message.guild.iconURL())
      .setDescription(`
      Entry Denied!
      it's looks u dont have the required role ${reaction.message.guild.roles.cache.get(grole.role).name || 'Role Not Found'}
      **You've Agrred by reaction to be dmed.**`)
      .setColor(`RED`)
      .setFooter(client.user.username , client.user.displayAvatarURL())  
reaction.users.remove(user.id)
      return user.send(embedf) 
  }

})  
}
})
 
const guildInvites = new Map();
  
  client.on("inviteCreate", async invite =>
    guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
  );
  client.on("ready", () => {
    client.guilds.cache.forEach(guild => {
      guild
        .fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
    });
  });
  
  client.on("guildMemberAdd", async member => {
    const catchedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    const usedInvite = newInvites.find(
      inv => catchedInvites.get(inv.code).uses < inv.uses
    );
    
    // db.set(`author_${member.guild.id}_${member.id}`, usedInvite.inviter.id);
    if(!usedInvite) {
      let vanity = config.unkown.split("[user]")
      .join(`<@${client.users.cache.get(member.id).id}>`)
      .split("[inviter]")
      .join(client.users.cache.get(usedInvite.inviter.id).username)
      .split("[invites]")
      .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.invites`))
      .split("[total]")
      .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`))
      .split("[leaves]")
      .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.leaves`))
      .split("[jointimes]")
      .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.joins`))
       member.guild.channels.cache.get(join).send(vanity)
    
    let user = db.get(`invites_${member.guild.id}_${member.id}`)
    if(!user) {
    let data = { 
      invites: 0,
      regular: 0,
      leaves: 0,
      joins: 0,
      by: client.users.cache.get(usedInvite.inviter.id).username,
      bouns: 0   
    }
    db.set(`invites_${member.guild.id}_${member.id}`, data) 
    }
    }
    if(!usedInvite) return;
    db.add(`invites_${member.guild.id}_${member.id}.joins`, 1)
    let invites = db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}`)
    if(!invites) {
      let brr = { 
        invites: 0,
        regular: 0,
        leaves: 0,
        joins: 0,
        by: client.users.cache.get(usedInvite.inviter.id).username,
        bouns: 0   
      }
      db.set(`invites_${member.guild.id}_${usedInvite.inviter.id}`, brr)
    }
    db.set(`author_${member.guild.id}_${member.id}`, usedInvite.inviter.id);  
    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}.invites`, 1)

    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`, 1)
    
    let join = db.get(`join_channel_${member.guild.id}`)
    let customize = db.get(`join_message_${member.guild.id}`)
    if(!customize) customize = config.join
    if(!join) return;
    let splita = customize
    .split("[user]")
    .join(client.users.cache.get(member.id).username)
    .split("[user.mention]")
    .join(`<@${client.users.cache.get(member.id).id}>`)
    .split("[inviter]")
    .join(client.users.cache.get(usedInvite.inviter.id).username)
    .split("[invites]")
    .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.invites`))
    .split("[total]")
    .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`))
    .split("[leaves]")
    .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.regular`))
    .split("[jointimes]")
    .join(db.get(`invites_${member.guild.id}_${usedInvite.inviter.id}.joins`))

     member.guild.channels.cache.get(join).send(splita)
 
  } catch (err) {
  console.log(err)
  }
  })
  client.on("guildMemberRemove", member => {
    try {
  let user = db.get(`author_${member.guild.id}_${member.id}`)
  if(!user) {
   let channel = db.get(`leave_channel_${member.guild.id}`)
   if(!channel) return;
   member.guild.channels.cache.get(channel).send(`${member.username} has left, but i can't figure out who invited him.`)
   return
  }

  let channel = db.get(`leave_channel_${member.guild.id}`)
  if(!channel) return;
  let leave = db.get(`leave_message_${member.guild.id}`)
  if(!leave) leave = config.leave;
  db.add(`invites_${member.guild.id}_${user}.leaves`, 1)
  db.subtract(`invites_${member.guild.id}_${user}.invites`, 1)
  let com = leave.split("[user]")
  .join(client.users.cache.get(member.id).username)
  .split("[inviter]")
  .join(client.users.cache.get(user).username)
  .split("[invites]")
  .join(db.get(`invites_${member.guild.id}_${user}.invites`))
  .split("[total]")
  .join(db.get(`invites_${member.guild.id}_${user}.regular`))
  .split("[leaves]")
  .join(db.get(`invites_${member.guild.id}_${user}.leaves`))
  .split("[jointimes]")
  .join(db.get(`invites_${member.guild.id}_${user}.joins`))

  member.guild.channels.cache.get(channel).send(com)
     } catch(err) {
      console.log(err)
    }
  })


 setInterval(() => {
client.guilds.cache.forEach(x =>{
  let ranks = db.get(`ranks_${x.id}`)
  if(!ranks) return;
  x.members.cache.forEach(o => {
  if(o.user.bot === true) return;
    let invites = db.get(`invites_${x.id}_${o.id}`)
    if(!invites) {
      let data = {
        invites: 0,
        regular: 0,
        leaves: 0,
        joins: 0,
        by: null,
        bouns: 0       
      }
      db.set(`invites_${x.id}_${o.id}`, data)
    return; 
    }    
    ranks.forEach(r => {
      let g = x.roles.cache.get(r.role)
if(!g) return;
x.members.fetch(o.id).then(member => {  
if(invites.invites > r.invites-1) {
       if(member.roles.cache.has(r.role)) return
        member.roles.add(r.role, { reason: "has enough invites" })
       db.set(`r_${x.id}_${o.id}_${r.role}`, true)
    }
    if(invites.invites < r.invites-1) {
      console.log(member.user.username)
      if(member.roles.cache.has(r.role)) {
        let check = db.get(`r_${x.id}_${o.id}_${r.role}`)
        if(!check) return;
        member.roles.remove(r.role, { reason: "don't have enough invites for the role"})
        db.delete(`r_${x.id}_${o.id}_${r.role}`)
      } 
      }
    })
    })
  })
})
 }, 5500);

 client.on('message', message => {
   if(message.content.startsWith('-test')) {
     let user = message.mentions.users.first()
     if(!user) return
     ;
     let data =  {
       vip: user.id
     }
     db.push(`vips`, data) // نضيف ال data to array
   return message.channel.send(`Aaa`)
    }

 }) // اها شيت شيء قاعد اسويه تجارب بل console ._.
 client.on('message', message => {
   if(message.content === 'test') {
     console.log(db.get(`vips`))
   }
 })
 // find
 client.on('message', message => {
   if(message.content === 'pog') {
     let data = db.get(`vips`)
     let database = data.find(x => x.vip === message.author.id)
     if(!database) return;
     if(database) return console.log('darky is pog')
   }
 })