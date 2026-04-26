// yearnAutoResponse.js
// 900+ triggers | No Cooldown | Tagalog Yearner System

const https = require('https');
const http = require('http');

const yearnCategories = [
  {
    name: 'miss',
    triggers: [
      'miss na kita', 'namimiss kita', 'miss ko siya', 'miss ko na siya', 'miss kita sobra',
      'miss na miss kita', 'namimiss pa rin kita', 'miss ko boses mo', 'miss ko tawa mo', 'miss ko yakap mo',
      'miss ko ikaw', 'miss ko siya ngayon', 'miss ko pa rin', 'sobrang miss kita', 'namimiss kita gabi gabi',
      'miss kita araw araw', 'hinahanap kita', 'hinahanap ko siya', 'hinahanap pa rin kita', 'miss ko presensya mo',
      'miss ko chat mo', 'miss ko goodnight mo', 'miss ko good morning mo', 'miss ko kulit mo', 'miss ko lambing mo',
      'namimiss ko lahat sayo', 'miss kita kahit wala ka na', 'miss pa rin kita kahit tapos na',
      'miss kita kahit di pwede', 'miss kita kahit masakit', 'miss kita kahit ako lang',
      'mingaw ko nimo', 'gimingaw ko nimo', 'gimingaw ko niya', 'mingaw na kaayo ko nimo', 'mingaw kos imong tingog', 
      'mingaw kos imong katawa', 'mingaw kos imong yakap', 'mingaw kos imong chat', 'mingaw kos imong goodnight', 
      'mingaw kos imong good morning', 'gimingaw ko sa tanan nimo', 'pangitaon gihapon tika', 'pangitaon gihapon nako siya', 
      'bisan wala naka mingaw gihapon ko', 'bisan sakit mingaw gihapon ko', 'bisan di pwede mingaw gihapon ko'
    ],
    responses: [
      'miss mo lang yan, wag mo muna i-chat 😭',
      'yearner spotted agad.',
      'sana miss ka rin niya, pero pahinga muna.',
      'ang lala ng miss era mo.',
      'hinga muna, wag relapse.',
      'miss is valid, habol is optional.',
      'soft heart mo ah.',
      'namimiss pero bawal marupok.',
      'baka nostalgia lang yan.',
      'protect your peace muna.'
    ]
  },
  {
    name: 'mahal',
    triggers: [
      'mahal pa rin kita', 'mahal ko pa siya', 'love ko pa rin siya', 'mahal kita hanggang ngayon',
      'may feelings pa ako', 'gusto ko pa rin siya', 'di pa rin nawawala feelings ko',
      'mahal pa rin kita kahit wala na', 'mahal pa rin kita kahit masakit',
      'mahal kita kahit hindi pwede', 'mahal kita kahit tapos na',
      'mahal ko pa rin siya kahit may iba na', 'mahal pa rin kita kahit ako nalang',
      'gusto ko pa rin siya kahit di ako pinili', 'mahal kita kahit hindi tayo',
      'love ko pa rin siya kahit wala na kami',
      'gihigugma gihapon tika', 'love pa gihapon tika', 'gusto pa gihapon tika', 'naa pa koy feelings nimo', 
      'wala pa nawala akong feelings', 'gihigugma gihapon nako siya', 'bisan wala na love pa gihapon', 
      'bisan sakit love pa gihapon tika', 'bisan di pwede love pa gihapon', 'ikaw gihapon akong gusto', 
      'ikaw gihapon akong gipangita'
    ],
    responses: [
      'mahal mo pa, pero mahalin mo rin sarili mo.',
      'okay lang magmahal pa, pero wag ubusin sarili.',
      'loyal ka, pero sana sa tamang tao.',
      'feelings are valid, pero boundaries din.',
      'yearning level: intense.',
      'love should not destroy you.',
      'piliin mo rin sarili mo kahit mahal mo siya.',
      'mahal pa rin, pero quiet healing muna.',
      'hindi ka kulang dahil hindi ka pinili.',
      'ang puso mo pagod na rin.'
    ]
  },
  {
    name: 'chat',
    triggers: [
      'chat ko na ba', 'ichachat ko ba', 'mag chat na ba ako', 'replyan ko ba', 'send ko na ba', 'dm ko na ba',
      'ichachat ko na siya', 'chat ko ba siya ngayon', 'mag message ba ako sa kanya',
      'send ko na ba message ko', 'replyan ko na ba siya', 'mag dm na ba ako',
      'kausapin ko na ba siya', 'mag reach out ba ako', 'mag sorry ba ako sa kanya',
      'ichachat ko ba kahit gabi na', 'chat ko ba kahit seen lang',
      'i-chat nako siya?', 'mo chat ko niya?', 'replyan nako siya?', 'send nako?', 'dm nako?', 
      'story reply nako?', 'istoryahon nako siya?', 'mangumusta ko niya?', 'mag sorry ko niya?', 
      'mo reach out ko?', 'chat nako bisan gabii na?', 'chat nako bisan seen lang?'
    ],
    responses: [
      'NO muna 😭',
      'type mo sa notes, wag sa chat.',
      'wag muna, emotional ka pa.',
      'inom tubig muna bago magdesisyon.',
      'wag mag relapse.',
      'sleep muna bago decision.',
      'protect dignity mode.',
      'kung gabi na, automatic no.',
      'wag hayaang feelings ang mag send.',
      'isip muna bago send.'
    ]
  },
  {
    name: 'sana',
    triggers: [
      'sana tayo ulit', 'sana kami ulit', 'sana bumalik', 'sana piliin niya ako', 'sana ako nalang',
      'sana bumalik siya sa akin', 'sana tayo pa rin', 'sana hindi natapos',
      'sana hindi kami naghiwalay', 'sana ako ang pinili', 'sana may chance pa',
      'sana pwede pa', 'sana maayos pa', 'sana hindi nawala',
      'sana hindi siya nagbago',
      'unta kita gihapon', 'unta kami gihapon', 'unta mubalik siya', 'unta pili-on ko niya', 
      'unta ako nalang', 'unta naa pay chance', 'unta ma okay pa', 'unta wala natapos', 
      'unta wala siya nagbag-o', 'unta pwede pa', 'unta di ko niya gibiyaan'
    ],
    responses: [
      'sana era is dangerous 😭',
      'hindi lahat ng sana dapat habulin.',
      'manifesting healing, not relapse.',
      'ang sakit ng what if.',
      'piliin mo rin sarili mo.',
      'wag kang tumira sa sana.',
      'what if hurts, pero reality matters.',
      'minsan lesson lang talaga.',
      'sana maging okay ka rin.',
      'peace over what if.'
    ]
  },
  {
    name: 'seen',
    triggers: [
      'seen lang', 'delivered lang', 'di nag reply', 'late reply siya', 'dry replies',
      'di niya ako nireplyan', 'seen niya lang ako', 'online siya pero di nag reply',
      'active siya pero di ako pinansin', 'late siya mag reply', 'di na siya nag update',
      'di na siya nag goodnight', 'di na siya nag good morning',
      'di na siya nag chat', 'di na siya nag effort',
      'seen ra', 'delivered ra', 'wala ni reply', 'dugay mo reply', 'dry kaayo siya mo reply', 
      'online siya pero wala ni reply', 'active siya pero wala ko tagda', 'wala na siya ni update', 
      'wala na siya nag goodnight', 'wala na siya nag good morning', 'wala na siya nag effort'
    ],
    responses: [
      'seen zone hurts pero wag mag double chat.',
      'di ka inbox decoration.',
      'matched energy muna.',
      'wag kang maghabol sa seen.',
      'seen is an answer sometimes.',
      'dry replies deserve dry energy.',
      'you deserve effort too.',
      'wag i-decode lahat.',
      'online does not mean available.',
      'protect your peace.'
    ]
  },
  {
    name: 'moveon',
    triggers: [
      'di ko siya makalimtan', 'paano siya kalimutan', 'hirap kalimutan',
      'di ko kaya mag move on', 'di pa ako naka move on',
      'hanggang ngayon siya pa rin', 'siya pa rin talaga', 'di ko mabitawan',
      'di ko ma let go', 'di ako maka move on',
      'hirap mag move on', 'moving on hurts',
      'di ko kaya kalimutan siya', 'di ko kaya mawala siya',
      'di nako siya makalimtan', 'lisod kaayo siya kalimtan', 'di ko kaya mag move on', 
      'wa pa ko naka move on', 'siya gihapon hangtod karon', 'di ko siya mabitawan', 
      'di ko siya ma let go', 'sakit kaayo mag move on', 'di nako kaya mawala siya'
    ],
    responses: [
      'one day, hindi na ganito kasakit.',
      'small steps lang sa moving on.',
      'wag madaliin ang healing.',
      'makakaya mo rin yan.',
      'hindi ka stuck forever.',
      'letting go is not betrayal.',
      'move on slowly, basta forward.',
      'healing is quiet but real.',
      'di mo kailangan kalimutan agad.',
      'unti-unti, kakayanin.'
    ]
  },
  {
    name: 'relapse',
    triggers: [
      "relapse", "relapse malala", "relapse na naman", "relapse hours", "delulu era", 
      "delulu na naman", "miss ko siya", "namimiss ko siya", "miss ko pa rin", "siya pa rin", 
      "ikaw pa rin", "hanggang ngayon siya", "di pa rin tapos", "di pa ako okay", 
      "di ko siya makalimutan", "di ko siya mabitawan", "di ko kaya mag move on", 
      "hirap mag move on", "chat ko ba siya", "ichachat ko ba siya", "wag ko ba siyang i-chat", 
      "seen lang", "delivered lang", "di siya nag reply", "online siya pero di nag reply", 
      "sana bumalik", "sana kami ulit", "sana tayo ulit", "sana may chance pa", 
      "what if kami pa rin", "what if siya talaga", "mahal ko pa rin siya", "mahal pa rin kita", 
      "gusto ko pa rin siya", "di pa rin nawawala feelings ko", "usad na", "move on na", 
      "let go na", "tama na beh", "protect your peace", "piliin mo sarili mo",
      "relapse na pud", "relapse napud", "delulu era napud", "delulu na pud", 
      "gimingaw ko niya", "gimingaw ko nimo", "mingaw ko niya", "mingaw ko nimo", 
      "mingaw gihapon", "siya gihapon", "ikaw gihapon", "hangtod karon siya", "wa pa ko okay", 
      "di pa ko okay", "di nako siya makalimtan", "di nako siya mabitawan", "di ko ka move on", 
      "lisod mag move on", "chat nako siya", "i-chat nako siya", "mo chat ko niya", 
      "ayaw na i-chat", "seen ra", "delivered ra", "wala siya ni reply", 
      "online siya pero wa ni reply", "unta mubalik", "unta kami gihapon", "unta kita gihapon", 
      "unta naa pay chance", "what if kami gihapon", "what if siya jud", 
      "love pa gihapon nako siya", "gihigugma gihapon tika", "gusto pa gihapon nako siya", 
      "wa pa nawala akong feelings", "usad na jud", "biyae na", "undangi na", 
      "amping sa imong peace", "pili-a imong kaugalingon"
    ],
    responses: [
      'relapse hours are the hardest. 🫂',
      'it\'s okay to feel this way, just don\'t stay there for too long.',
      'hinga lang nang malalim. relapse is part of healing.',
      'ayaw na pag relapse bestie, amping sa imong self.',
      'pahuway sa gamay. valid imong gibati pero ayaw kalimti imong peace.'
    ]
  }
];

const yearnLyrics = [
  'Kung pwede lang ibalik ang dati, hindi na sana kita binitawan.',
  'Sa bawat tahimik na gabi, pangalan mo pa rin ang dasal ko.',
  'Hindi ka na nandito, pero ikaw pa rin ang hinahanap ko.',
  'Pinilit kong kalimutan ka, pero puso ko ang ayaw sumunod.',
  'Kung tayo talaga, bakit parang ako lang ang lumalaban?',
  'Unti-unti kitang binitiwan, pero buong buo kitang minahal.',
  'Sa dami ng tao, ikaw pa rin ang hinahanap ng puso ko.',
  'Hindi na tayo, pero ikaw pa rin ang gusto ko.',
  'Ang sakit pala magmahal nang mag-isa.',
  'Mahal pa rin kita, kahit hindi na pwede.',
  'Kung pwede pa lang ibalik ang tanan, dili unta tika gibuhian.', 
  'Sa hilom nga gabii, imong ngalan gihapon akong mahunahunaan.', 
  'Wala naka diri, pero ikaw gihapon akong gipangita.', 
  'Gisulay tika kalimtan, pero akong kasingkasing di mosugot.', 
  'Kung kita jud, nganong murag ako nalang ang nagkupot?', 
  'Hinay-hinay tika gibiyaan, pero tinuod tika nga gihigugma.', 
  'Sa kadaghan sa tao, ikaw gihapon ang gipangita sa akong kasingkasing.', 
  'Dili na kita, pero ikaw gihapon akong gusto.', 
  'Sakit diay kaayo ang mahigugma nga ikaw ra usa.', 
  'Gihigugma gihapon tika, bisan di na pwede.'
];

const responseOpeners = [
  'miss mo lang yan',
  'yearner spotted',
  'hinga muna',
  'wag muna mag relapse',
  'protect your peace',
  'piliin mo sarili mo',
  'soft heart detected',
  'valid yan',
  'wag maghabol',
  'healing muna',
  'mingaw ra na nimo', 
  'yearner spotted kaayo', 
  'ginhawa sa gamay', 
  'ayaw sa pag relapse', 
  'amping sa imong peace', 
  'pili-a pud imong kaugalingon', 
  'soft heart kaayo ka', 
  'valid na imong gibati', 
  'ayaw na pag gukod', 
  'healing sa ta'
];

const responseMiddles = [
  'pero wag mo muna i-chat',
  'pero alagaan mo rin sarili mo',
  'kasi pagod na rin puso mo',
  'kasi hindi lahat dapat balikan',
  'kahit masakit ngayon',
  'kahit siya pa rin ang laman ng isip mo',
  'kahit hindi madali',
  'kahit may what if pa',
  'kahit namimiss mo siya',
  'kahit gusto mo siyang balikan',
  'pero ayaw sa siya i-chat', 
  'pero atimana pud imong kaugalingon', 
  'kay kapoy na pud imong kasingkasing', 
  'kay dili tanan angay balikan', 
  'bisan sakit karon', 
  'bisan siya gihapon imong gihunahuna', 
  'bisan dili sayon', 
  'bisan daghan pa kag what if', 
  'bisan gimingaw ka niya', 
  'bisan ganahan ka mubalik niya'
];

const responseEndings = [
  '😭',
  '💔',
  '🫂',
  'okay?',
  'bestie.',
  'yearner era malala.',
  'pahinga ka muna.',
  'wag ubusin sarili.',
  'love yourself din.',
  'kakayanin mo yan.',
  'yearner era kaayo.', 
  'pahuway sa gamay.', 
  'ayaw hutda imong kaugalingon.', 
  'love yourself pud.', 
  'makaya ra na nimo.'
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function clean(text) {
  return text.toLowerCase().replace(/[^\w\sÀ-ÿñÑ]/g, '').trim();
}

function uniqueNormalized(items) {
  const seen = new Set();
  return items.filter((item) => {
    const normalized = clean(item).replace(/\s+/g, ' ');
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function generateYearnResponses(limit = 900) {
  const responses = [];

  for (const opener of responseOpeners) {
    for (const middle of responseMiddles) {
      for (const ending of responseEndings) {
        responses.push(`${opener}, ${middle}, ${ending}`);
        if (responses.length >= limit) {
          return uniqueNormalized(responses);
        }
      }
    }
  }

  return uniqueNormalized(responses);
}

const generatedYearnResponses = generateYearnResponses(5000);

const quoteSets = {
  yearners: [
    '"Some hearts wait quietly, even when no one comes back."',
    '"Yearning is love with nowhere to land."',
    '"Missing them is loud, even in silence."',
    '"You can still love deeply and choose yourself."'
  ],
  lovers: [
    '"Love should feel safe, not confusing."',
    '"A soft heart is not weakness, it is courage."',
    '"Real love does not ask you to disappear."',
    '"Love is beautiful, but so is your peace."'
  ],
  broken: [
    '"Broken does not mean ruined; it means healing started."',
    '"Even shattered hearts learn how to beat gently again."',
    '"Pain can visit, but it does not own your future."',
    '"You are allowed to rebuild slowly."'
  ],
  sad: [
    '"Sad days are real, but they are not forever."',
    '"Rest is a form of healing too."',
    '"You do not have to carry every ache alone."',
    '"Small steps still count on heavy days."'
  ]
};

const quoteCategoryMap = {
  miss: 'yearners',
  relapse: 'yearners',
  chat: 'yearners',
  sana: 'yearners',
  mahal: 'lovers',
  moveon: 'broken',
  seen: 'sad'
};

const songMoments = [
  '🎵 this reminds me of something… Joji - Glimpse of Us',
  '🎵 this reminds me of something… The 1975 - Somebody Else',
  '🎵 this reminds me of something… Moira Dela Torre - Paubaya',
  '🎵 this reminds me of something… Ben&Ben - Leaves',
  '🎵 playlist for this mood: https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1'
];

const shuffledState = new Map();

function nextFromShufflePool(key, values) {
  if (!Array.isArray(values) || values.length === 0) return null;

  const normalizedValues = uniqueNormalized(values);
  const current = shuffledState.get(key);
  const needsRefill = !current || current.index >= current.pool.length || current.sourceSize !== normalizedValues.length;

  if (needsRefill) {
    const previous = current?.last ?? null;
    let pool = shuffleArray(normalizedValues);

    if (pool.length > 1 && previous && pool[0] === previous) {
      [pool[0], pool[1]] = [pool[1], pool[0]];
    }

    shuffledState.set(key, {
      pool,
      index: 0,
      last: previous,
      sourceSize: normalizedValues.length
    });
  }

  const state = shuffledState.get(key);
  const item = state.pool[state.index];
  state.index += 1;
  state.last = item;
  return item;
}

for (const category of yearnCategories) {
  category.triggers = uniqueNormalized(category.triggers);
  category.responses = uniqueNormalized(category.responses);
}

function getYearnReply(content) {
  const text = clean(content);

  for (const cat of yearnCategories) {
    if (cat.triggers.some((trigger) => text.includes(clean(trigger)))) {
      const categoryReply = nextFromShufflePool(`cat:${cat.name}`, cat.responses);
      const yearnLine = nextFromShufflePool('generated:yearn', generatedYearnResponses);
      const lyricLine = nextFromShufflePool('lyrics:yearn', yearnLyrics);
      const quoteGroup = quoteCategoryMap[cat.name] || 'yearners';
      const quoteLine = nextFromShufflePool(`quote:${quoteGroup}`, quoteSets[quoteGroup]);
      const songLine = Math.random() < 0.2
        ? nextFromShufflePool('songs:yearn', songMoments)
        : null;

      const candidates = uniqueNormalized([
        categoryReply && `💬 ${categoryReply}`,
        yearnLine && `💔 ${yearnLine}`,
        lyricLine && `🎧 ${lyricLine}`,
        quoteLine && `🕯️ ${quoteLine}`,
        songLine
      ].filter(Boolean));

      return nextFromShufflePool(`mixed:${cat.name}`, candidates);
    }
  }

  return null;
}

/**
 * Generates an AI response using an OpenAI-compatible API.
 * Requires OPENAI_API_KEY in .env
 */
async function getAIResponse(userMessage) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const systemPrompt = `You are a melancholic, moody, and poetic AI assistant. 
  You respond to people who are "yearning" or feeling heartbreak. 
  Your tone is soft, slightly sad, and very empathetic. 
  You can speak in English, Tagalog, or Bisaya (Cebuano). 
  Keep your responses short (1-2 sentences) and meaningful. 
  Do not use emojis unless they are 😭, 💔, or 🫂.
  Current context: Someone is expressing longing or pain.`;

  const data = JSON.stringify({
    model: model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    max_tokens: 100,
    temperature: 0.8
  });

  try {
    const baseUrl = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
    const endpoint = process.env.OPENAI_CHAT_COMPLETIONS_PATH || '/chat/completions';
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = new URL(`${baseUrl}${normalizedEndpoint}`);
    const requestModule = url.protocol === 'http:' ? http : https;
    const options = {
      hostname: url.hostname,
      port: url.port || undefined,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    return new Promise((resolve) => {
      const req = requestModule.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            const content = json?.choices?.[0]?.message?.content;
            if (typeof content === 'string' && content.trim()) return resolve(content.trim());
            if (Array.isArray(content)) {
              const merged = content
                .map((entry) => (typeof entry === 'string' ? entry : entry?.text || ''))
                .join(' ')
                .trim();
              if (merged) return resolve(merged);
            }
            resolve(null);
          } catch (e) {
            resolve(null);
          }
        });
      });

      req.on('error', () => resolve(null));
      req.write(data);
      req.end();
    });
  } catch (error) {
    return null;
  }
}

async function handleYearn(message, settings = {}) {
  if (message.author.bot) return false;

  const text = clean(message.content);
  const isTriggered = yearnCategories.some(cat => 
    cat.triggers.some(trigger => text.includes(clean(trigger)))
  );

  if (!isTriggered) return false;

  const aiRepliesEnabled = settings.aiRepliesEnabled !== false;
  const aiReplyChance = Number.isFinite(settings.aiReplyChance)
    ? Math.max(0, Math.min(1, settings.aiReplyChance))
    : 0.3;

  if (aiRepliesEnabled && process.env.OPENAI_API_KEY && Math.random() < aiReplyChance) {
    const aiReply = await getAIResponse(message.content);
    if (aiReply) {
      if (typeof settings.beforeReply === 'function') {
        const proceed = await settings.beforeReply();
        if (!proceed) return true;
      }
      await message.reply({
        content: `✨ ${aiReply}`,
        allowedMentions: { repliedUser: false }
      });
      return true;
    }
  }

  const reply = getYearnReply(message.content);
  if (!reply) return false;
  if (typeof settings.beforeReply === 'function') {
    const proceed = await settings.beforeReply();
    if (!proceed) return true;
  }

  await message.reply({
    content: reply,
    allowedMentions: { repliedUser: false }
  });

  return true;
}

module.exports = { handleYearn, getYearnReply };
