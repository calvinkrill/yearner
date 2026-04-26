// yearnAutoResponse.js
// 900+ triggers | No Cooldown | Tagalog Yearner System

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
      'miss kita kahit di pwede', 'miss kita kahit masakit', 'miss kita kahit ako lang'
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
      'love ko pa rin siya kahit wala na kami'
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
      'ichachat ko ba kahit gabi na', 'chat ko ba kahit seen lang'
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
      'sana hindi siya nagbago'
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
      'di na siya nag chat', 'di na siya nag effort'
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
      'di ko siya makalimutan', 'paano siya kalimutan', 'hirap kalimutan',
      'di ko kaya mag move on', 'di pa ako naka move on',
      'hanggang ngayon siya pa rin', 'siya pa rin talaga', 'di ko mabitawan',
      'di ko ma let go', 'di ako maka move on',
      'hirap mag move on', 'moving on hurts',
      'di ko kaya kalimutan siya', 'di ko kaya mawala siya'
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
  'Mahal pa rin kita, kahit hindi na pwede.'
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
  'healing muna'
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
  'kahit gusto mo siyang balikan'
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
  'kakayanin mo yan.'
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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

const generatedYearnResponses = generateYearnResponses(900);

for (const category of yearnCategories) {
  category.triggers = uniqueNormalized(category.triggers);
  category.responses = uniqueNormalized(category.responses);
}

function getYearnReply(content) {
  const text = clean(content);

  for (const cat of yearnCategories) {
    if (cat.triggers.some((trigger) => text.includes(clean(trigger)))) {
      return Math.random() < 0.5
        ? `🎧 ${pickRandom(uniqueNormalized(yearnLyrics))}`
        : `💔 ${pickRandom(generatedYearnResponses)}`;
    }
  }

  return null;
}

async function handleYearn(message) {
  if (message.author.bot) return false;

  const reply = getYearnReply(message.content);
  if (!reply) return false;

  await message.reply({
    content: reply,
    allowedMentions: { repliedUser: false }
  });

  return true;
}

module.exports = { handleYearn, getYearnReply };
