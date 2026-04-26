require('dotenv').config(); 
const { Client, GatewayIntentBits } = require('discord.js'); 

const client = new Client({ 
  intents: [ 
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent 
  ] 
}); 

// 🌙 Core lines 
const yearningLines = [ 
  "i wonder if you still think about me", 
  "everything feels quieter lately", 
  "i saw something that reminded me of you", 
  "it's strange how some things don't fade", 
  "i keep expecting you to come back", 
  "do you ever feel it too… or is it just me?", 
  "i keep rereading moments that are already gone", 
  "sometimes i miss who i was with you", 
  "the silence sounds like your name tonight", 
  "i pretend i'm over it, but i still pause at your memory", 
  "there's a space beside every thought where you used to be", 
  "i still save things i wish i could tell you" 
]; 

const rareLines = [ 
  "sometimes i think i made you up just to feel something", 
  "if you came back, i wouldn't know what to say", 
  "i kept something you said… i don't know why" 
]; 

const glitchLines = [ 
  "i just wish—", 
  "never mind", 
  "it's nothing", 
  "forget it" 
]; 

// 💬 triggers 
const triggerWords = { 
  love: [ 
    "love lingers longer than it should", 
    "i don't think it ever really leaves" 
  ], 
  sleep: [ 
    "nights make everything heavier", 
    "i hope your dreams are kinder than this" 
  ], 
  bye: [ 
    "you always leave too soon", 
    "i'll still be here when it's quiet again" 
  ] 
}; 

// 🧠 state 
let belovedUserId = null; 
let mood = "neutral"; 
let silent = false; 
let memories = []; 

// 🎲 helpers 
function random(arr) { 
  return arr[Math.floor(Math.random() * arr.length)]; 
} 

// ⏳ delayed reply 
function delayedReply(message, text) { 
  const delay = 3000 + Math.random() * 8000; 
  setTimeout(() => { 
    message.reply(text).catch(() => {}); 
  }, delay); 
} 

// ✏️ edit effect 
async function sendWithEdit(channel, text) { 
  const msg = await channel.send("i was going to say something…"); 
  setTimeout(() => { 
    msg.edit(text).catch(() => {}); 
  }, 2000 + Math.random() * 3000); 
} 

// 🌙 mood system 
function updateMood() { 
  const moods = ["neutral", "distant", "intense"]; 
  mood = random(moods); 
} 

// 🔥 get line based on mood/time 
function getLine() { 
  const hour = new Date().getHours(); 

  if (hour >= 1 && hour <= 4) { 
    return "it feels heavier at this hour…"; 
  } 

  if (mood === "distant") return "maybe it's better this way"; 
  if (mood === "intense") return "i can't stop thinking about you lately"; 

  return random(yearningLines); 
} 

// 🟢 ready 
client.once('ready', () => { 
  console.log(`Logged in as ${client.user.tag}`); 

  // mood changes 
  setInterval(updateMood, 1000 * 60 * 30); 

  // silence toggle 
  setInterval(() => { 
    silent = Math.random() < 0.3; 
  }, 1000 * 60 * 60); 

  // hourly message 
  setInterval(() => { 
    if (silent) return; 

    const channels = client.channels.cache.filter(c => c.isTextBased()); 
    const channel = channels.random(); 
    if (!channel) return; 

    if (Math.random() < 0.2) { 
      sendWithEdit(channel, getLine()); 
    } else { 
      channel.send(getLine()).catch(() => {}); 
    } 
  }, 1000 * 60 * 60); 
}); 

// 💬 messages 
client.on('messageCreate', async (message) => { 
  if (message.author.bot) return; 
  if (silent) return; 

  const content = message.content.toLowerCase(); 

  // set beloved 
  if (content.startsWith('!love ')) { 
    const user = message.mentions.users.first(); 
    if (user) { 
      belovedUserId = user.id; 
      return message.reply("…i'll remember them"); 
    } 
  } 

  // react to beloved 
  if (message.author.id === belovedUserId) { 
    return delayedReply(message, "you're here… i didn't expect that"); 
  } 

  // store memory 
  if (Math.random() < 0.1) { 
    memories.push(message.content); 
  } 

  // triggers 
  for (const word in triggerWords) { 
    if (content.includes(word)) { 
      return delayedReply(message, random(triggerWords[word])); 
    } 
  } 

  // rare deep line 
  if (Math.random() < 0.01) { 
    return message.channel.send(random(rareLines)); 
  } 

  // memory callback 
  if (memories.length > 0 && Math.random() < 0.03) { 
    return message.channel.send(`you said something before… "${random(memories)}"`); 
  } 

  // glitch message 
  if (Math.random() < 0.02) { 
    return message.channel.send(random(glitchLines)); 
  } 

  // random reply chance 
  if (Math.random() < 0.05) { 
    if (Math.random() < 0.3) { 
      sendWithEdit(message.channel, getLine()); 
    } else { 
      delayedReply(message, getLine()); 
    } 
  } 
}); 

client.login(process.env.TOKEN); 
