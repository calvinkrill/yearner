require('dotenv').config(); 
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js'); 

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

const AUTO_RESPONSES = {
  yearning: {
    triggers: [
      "i miss you", "i miss her", "i miss him", "i miss them",
      "i miss us", "i still miss you", "wish you were here",
      "come back", "i want you here", "i need you here"
    ],
    responses: [
      "💭 Some people stay in your heart even when they are far.",
      "🌙 Missing someone feels louder at night.",
      "💔 The heart remembers what it once held close.",
      "🌧️ Some feelings do not leave easily.",
      "🤍 Distance can be quiet, but the heart still speaks.",
      "🥀 You can miss someone and still keep going.",
      "✨ Some memories feel like home.",
      "🫶 It sounds like they meant a lot to you.",
      "🌌 Even silence can carry feelings.",
      "💭 Missing someone is a soft kind of pain."
    ]
  },
  love: {
    triggers: [
      "i love you", "ily", "i love her", "i love him",
      "i love them", "love you", "i still love you"
    ],
    responses: [
      "🤍 Love is a heavy word, but a beautiful one.",
      "🫶 That feeling sounds real.",
      "🌸 Love can be soft, loud, and confusing all at once.",
      "💌 Some hearts speak even when words are small.",
      "✨ Love feels different when it is sincere.",
      "🌙 Some people become your favorite feeling.",
      "💭 Real feelings are hard to hide.",
      "🤍 That is sweet.",
      "🫂 Love should feel safe and kind.",
      "🌷 A soft heart is not a weakness."
    ]
  },
  sad: {
    triggers: [
      "im sad", "i'm sad", "i am sad", "sad ako",
      "i feel sad", "i feel empty", "i feel alone",
      "i feel tired", "im tired", "i'm tired"
    ],
    responses: [
      "🫂 You are not alone.",
      "🤍 Take it slow. One breath at a time.",
      "🌧️ Bad days do not last forever.",
      "🕯️ It is okay to feel tired sometimes.",
      "💭 Your feelings are valid.",
      "🌙 Rest if your heart feels heavy.",
      "🤍 You do not have to carry everything at once.",
      "🫶 Be gentle with yourself today.",
      "✨ Small steps still count.",
      "🌸 You matter, even on quiet days."
    ]
  },
  goodnight: {
    triggers: [
      "goodnight", "good night", "gn", "night night",
      "sleep well", "matulog na", "tulog na"
    ],
    responses: [
      "🌙 Goodnight, rest well.",
      "✨ Sleep peacefully tonight.",
      "💤 May your dreams feel soft.",
      "🤍 Rest your mind. Tomorrow is another chance.",
      "🌌 The night is quiet, so let your heart rest too.",
      "🫶 Goodnight. You did enough today.",
      "🌙 Close your eyes and breathe slowly.",
      "💭 Sleep well, soft soul.",
      "✨ May tomorrow be kinder.",
      "💤 Rest now, you deserve peace."
    ]
  },
  goodmorning: {
    triggers: [
      "good morning", "gm", "morning", "maayong buntag",
      "rise and shine"
    ],
    responses: [
      "☀️ Good morning. I hope today is kind to you.",
      "🌸 New day, new chance.",
      "✨ Good morning, soft soul.",
      "🤍 I hope you smile today.",
      "☕ Start slow, you got this.",
      "🌞 May your day feel lighter.",
      "🫶 Good morning. Take care of yourself.",
      "🌷 A fresh day is here.",
      "💭 I hope something good happens today.",
      "☀️ Wake up gently, the world can wait."
    ]
  },
  lonely: {
    triggers: [
      "im lonely", "i'm lonely", "i feel lonely",
      "alone ako", "i feel alone", "nobody cares"
    ],
    responses: [
      "🫂 You are not invisible.",
      "🤍 Someone out there will be glad you stayed kind.",
      "🌙 Feeling alone does not mean you are unwanted.",
      "🫶 You deserve warmth and care.",
      "💭 Loneliness is heavy, but it can pass.",
      "✨ You are still worthy of love and friendship.",
      "🌧️ Some nights feel empty, but morning still comes.",
      "🤍 Your presence matters.",
      "🫂 I hope you find comfort tonight.",
      "🌸 You are more loved than you may feel right now."
    ]
  }
};

// 🫧 soft emotion commands
const SOFT_COMMANDS = {
  miss: [
    "💭 {author} quietly misses {target}…",
    "💭 {author} wishes {target} was here right now."
  ],
  longfor: [
    "🌙 {author} longs to be close to {target}.",
    "🌙 {author} can’t stop thinking about {target}…"
  ],
  wait: [
    "⏳ {author} is patiently waiting for {target}.",
    "⏳ No matter how long, {author} will wait for {target}."
  ],
  yearn: [
    "💔 {author} feels a deep yearning for {target}…",
    "💔 {author}’s heart pulls toward {target}."
  ],
  dream: [
    "🌌 {author} dreams about being with {target}.",
    "🌌 Even in dreams, {author} finds {target}."
  ],
  holdhand: [
    "🤝 {author} gently holds {target}’s hand.",
    "🤝 A quiet moment shared between {author} and {target}."
  ],
  stay: [
    "🫶 {author} wants {target} to stay.",
    "🫶 ‘Please don’t go,’ {author} whispers to {target}."
  ],
  remember: [
    "📸 {author} remembers moments with {target}.",
    "📸 Every memory with {target} means a lot to {author}."
  ],
  comfort: [
    "🫂 {author} comforts {target} softly.",
    "🫂 {author} is here for {target}, no matter what."
  ],
  promise: [
    "🤍 {author} makes a quiet promise to {target}.",
    "🤍 ‘I’ll stay,’ says {author} to {target}."
  ]
};

const GIF_CATEGORIES = {
  miss: [
    "https://media.tenor.com/8KQZK9Zq7VAAAAAC/anime-rain.gif",
    "https://media.tenor.com/0AVbKGY_MxMAAAAC/rain-anime.gif",
    "https://media.tenor.com/fxYjP7nQk6MAAAAC/anime-rain-window.gif",
    "https://media.tenor.com/2p8tRrLk0FMAAAAC/anime-sad-rain.gif",
    "https://media.tenor.com/hQv7Xz4m0XAAAAAC/anime-crying-rain.gif"
  ],
  longfor: [
    "https://media.tenor.com/JQK5ePpSZFEAAAAC/anime-night.gif",
    "https://media.tenor.com/YqJz8lRkE0MAAAAC/anime-night-sky.gif",
    "https://media.tenor.com/R7lqVw7mR6IAAAAC/anime-stars.gif",
    "https://media.tenor.com/W7Kkz7Zxw4YAAAAC/anime-moon.gif",
    "https://media.tenor.com/qkFZK9wY6WMAAAAC/anime-stargazing.gif"
  ],
  wait: [
    "https://media.tenor.com/Zxw7f7wZpXAAAAAC/anime-waiting.gif",
    "https://media.tenor.com/6zK7t7lWb2IAAAAC/anime-window.gif",
    "https://media.tenor.com/4k7v7qQk3ZMAAAAC/anime-alone-night.gif",
    "https://media.tenor.com/8xYk7mQv1QAAAAAC/anime-looking-out-window.gif"
  ],
  yearn: [
    "https://media.tenor.com/JQK5ePpSZFEAAAAC/anime-night.gif",
    "https://media.tenor.com/YqJz8lRkE0MAAAAC/anime-night-sky.gif",
    "https://media.tenor.com/R7lqVw7mR6IAAAAC/anime-stars.gif",
    "https://media.tenor.com/W7Kkz7Zxw4YAAAAC/anime-moon.gif",
    "https://media.tenor.com/qkFZK9wY6WMAAAAC/anime-stargazing.gif"
  ],
  dream: [
    "https://media.tenor.com/R7lqVw7mR6IAAAAC/anime-stars.gif",
    "https://media.tenor.com/W7Kkz7Zxw4YAAAAC/anime-moon.gif",
    "https://media.tenor.com/qkFZK9wY6WMAAAAC/anime-stargazing.gif",
    "https://media.tenor.com/xvZK7k8k0YAAAAAC/anime-sunset.gif",
    "https://media.tenor.com/3Kz7k8Lk1ZMAAAAC/anime-soft-scene.gif"
  ],
  holdhand: [
    "https://media.tenor.com/1X9lF4vZ9pQAAAAC/anime-hug.gif",
    "https://media.tenor.com/dn6vJfP7l0UAAAAC/anime-cuddle.gif",
    "https://media.tenor.com/9Xr9sW7kP2MAAAAC/anime-soft-hug.gif"
  ],
  stay: [
    "https://media.tenor.com/6zK7t7lWb2IAAAAC/anime-window.gif",
    "https://media.tenor.com/Zxw7f7wZpXAAAAAC/anime-waiting.gif",
    "https://media.tenor.com/JQK5ePpSZFEAAAAC/anime-night.gif"
  ],
  remember: [
    "https://media.tenor.com/7kL0k7kQ0ZAAAAAC/anime-sakura.gif",
    "https://media.tenor.com/6LwX7rKjv3QAAAAC/anime-breeze.gif",
    "https://media.tenor.com/xvZK7k8k0YAAAAAC/anime-sunset.gif",
    "https://media.tenor.com/3Kz7k8Lk1ZMAAAAC/anime-soft-scene.gif"
  ],
  comfort: [
    "https://media.tenor.com/1X9lF4vZ9pQAAAAC/anime-hug.gif",
    "https://media.tenor.com/kzK0q0x6mXAAAAAC/anime-comfort.gif",
    "https://media.tenor.com/dn6vJfP7l0UAAAAC/anime-cuddle.gif",
    "https://media.tenor.com/9Xr9sW7kP2MAAAAC/anime-soft-hug.gif"
  ],
  promise: [
    "https://media.tenor.com/7kL0k7kQ0ZAAAAAC/anime-sakura.gif",
    "https://media.tenor.com/xvZK7k8k0YAAAAAC/anime-sunset.gif",
    "https://media.tenor.com/JQK5ePpSZFEAAAAC/anime-night.gif"
  ]
};

const RARE_GIFS = [
  "https://media.tenor.com/uQWZQZQ6V1AAAAAC/anime-sad.gif",
  "https://media.tenor.com/jKk5W6r8ZcMAAAAC/anime-tears.gif"
];

// 🧠 state 
let belovedUserId = null; 
let mood = "neutral"; 
let silent = false; 
let memories = []; 

// 🎲 helpers 
function random(arr) { 
  return arr[Math.floor(Math.random() * arr.length)]; 
} 

function maybePickRareGif(defaultGif) {
  if (Math.floor(Math.random() * 20) === 0) {
    return random(RARE_GIFS);
  }
  return defaultGif;
}

function formatSoftLine(template, author, target) {
  return template
    .replaceAll('{author}', author)
    .replaceAll('{target}', target);
}

async function sendSoftCommandEmbed(message, commandName, targetUser) {
  const templates = SOFT_COMMANDS[commandName];
  if (!templates) return false;

  const line = formatSoftLine(
    random(templates),
    message.member?.displayName || message.author.globalName || message.author.username,
    targetUser.globalName || targetUser.username
  );

  const gifs = GIF_CATEGORIES[commandName] || [];
  const selectedGif = gifs.length > 0 ? maybePickRareGif(random(gifs)) : null;

  const embed = new EmbedBuilder()
    .setColor(0x2b2d31)
    .setDescription(line)
    .setFooter({ text: 'soft hours' })
    .setTimestamp(new Date());

  if (selectedGif) {
    embed.setImage(selectedGif);
  }

  await message.channel.send({ embeds: [embed] });
  return true;
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

  for (const category of Object.values(AUTO_RESPONSES)) {
    if (category.triggers.some(trigger => content.includes(trigger))) {
      await message.reply({
        content: random(category.responses),
        allowedMentions: { repliedUser: false }
      });
      return;
    }
  }

  // /soft command handling: /miss @user, /yearn @user, etc.
  if (content.startsWith('/')) {
    const [commandName] = content.slice(1).split(/\s+/);
    const targetUser = message.mentions.users.first();

    if (SOFT_COMMANDS[commandName]) {
      if (!targetUser) {
        await message.reply(`mention someone to use \`/${commandName} @user\`.`);
        return;
      }

      await sendSoftCommandEmbed(message, commandName, targetUser);
      return;
    }
  }

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
