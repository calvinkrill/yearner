require('dotenv').config(); 
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ApplicationCommandOptionType,
  ChannelType,
  PermissionsBitField
} = require('discord.js'); 

const client = new Client({ 
  intents: [ 
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent 
  ] 
}); 

const yearnSetupChannels = new Map();
const CONFESSION_PANEL_ID = 'yearn_confession_panel';
const SUBMIT_CONFESSION_ID = 'yearn_submit_confession';
const REPLY_CONFESSION_ID = 'yearn_reply_confession';
const CONFESSION_MODAL_ID = 'yearn_confession_modal';
const REPLY_MODAL_PREFIX = 'yearn_reply_modal_';

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


const uniqueNormalized = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const normalized = item.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
};


const tagalogYearnAutoResponses = [
  {
    triggers: [
      "miss na kita", "namimiss kita", "miss ko siya", "miss ko na siya", "miss kita sobra",
      "miss na miss kita", "namimiss pa rin kita", "miss ko na boses mo", "miss ko yakap mo", "miss ko tawa mo"
    ],
    responses: [
      "miss mo lang yan, wag mo muna i-chat 😭",
      "yearner spotted agad",
      "sana miss ka rin niya, pero pahinga muna",
      "ang lala ng miss era mo",
      "hinga muna, wag relapse"
    ]
  },
  {
    triggers: [
      "mahal pa rin kita", "mahal ko pa siya", "love ko pa rin siya", "mahal pa rin niya kaya ako",
      "mahal kita hanggang ngayon", "di pa rin nawawala feelings ko", "may feelings pa ako",
      "mahal ko pa rin ex ko", "gusto ko pa rin siya", "di ko siya kayang kalimutan"
    ],
    responses: [
      "mahal mo pa, pero mahalin mo rin sarili mo",
      "okay lang magmahal pa, pero wag ubusin sarili",
      "loyal ka, pero sana sa tamang tao",
      "feelings are valid, pero boundaries din",
      "yearning level: intense"
    ]
  },
  {
    triggers: [
      "balik ka na", "bumalik ka na", "balikan mo ako", "balikan mo na ako", "sana bumalik siya",
      "sana bumalik ka", "balik tayo", "balik na tayo", "gusto ko bumalik siya", "bumalik ka please"
    ],
    responses: [
      "ang sakit ng balik ka na era",
      "kung babalik, dapat mas maayos na",
      "wag mag beg, protect your peace",
      "minsan closure na ang hindi pagbalik",
      "sana healing muna bago balik"
    ]
  },
  {
    triggers: [
      "chat ko na ba", "ichachat ko ba", "mag chat na ba ako", "replyan ko ba", "mag message ba ako",
      "i-chat ko siya", "dapat ba akong mag chat", "send ko na ba", "imessage ko ba", "dm ko na ba"
    ],
    responses: [
      "NO muna, emotional ka pa 😭",
      "type mo sa notes, wag sa chat",
      "pag gabi na, automatic no",
      "inom tubig muna bago magdesisyon",
      "wag mo hayaang yearning ang mag send"
    ]
  },
  {
    triggers: [
      "sana tayo ulit", "sana tayo nalang ulit", "sana kami ulit", "sana kami nalang ulit",
      "sana bumalik sa dati", "sana dati nalang", "sana hindi natapos", "sana hindi kami naghiwalay",
      "sana ako nalang", "sana piliin niya ako"
    ],
    responses: [
      "sana era is dangerous 😭",
      "hindi lahat ng sana dapat habulin",
      "manifesting peace, not relapse",
      "sana ikaw rin piliin mo sarili mo",
      "ang sakit ng what if"
    ]
  },
  {
    triggers: [
      "iniisip pa rin kita", "lagi kitang iniisip", "naiisip ko siya", "di mawala sa isip ko",
      "nasa isip ko siya", "siya pa rin nasa isip ko", "iniisip kaya niya ako", "naiisip kaya niya ako",
      "gabi gabi ko siya naiisip", "umaga palang siya na agad"
    ],
    responses: [
      "rent free sa utak mo ah",
      "okay lang maalala, wag lang mag-stalk",
      "overthinking plus yearning combo",
      "pahinga rin utak mo please",
      "baka kailangan mo muna mag focus sa sarili"
    ]
  },
  {
    triggers: [
      "ang sakit", "sakit pa rin", "nasasaktan ako", "sakit mo", "sakit ng ginawa niya",
      "ang sakit niya mahalin", "ang sakit maghintay", "sakit ng memories", "sakit ng miss kita",
      "sakit ng hindi pinili"
    ],
    responses: [
      "yakap, pero virtual muna 🫂",
      "valid yan, gagaan din yan",
      "iyak mo lang, wag mo i-chat",
      "healing takes time",
      "masakit ngayon, pero hindi forever"
    ]
  },
  {
    triggers: [
      "hinihintay ko siya", "aantayin kita", "waiting pa rin", "maghihintay ako", "antay pa rin ako",
      "hinihintay pa rin kita", "kahit matagal maghihintay ako", "waiting era", "antayin ko ba siya",
      "baka bumalik pa siya"
    ],
    responses: [
      "waiting era pero may self-respect dapat",
      "huwag kalimutan mabuhay habang naghihintay",
      "baka ikaw nalang naghihintay ha",
      "loyal ka, pero sana worth it",
      "wag gawing bahay ang waiting room"
    ]
  },
  {
    triggers: [
      "cold na siya", "ang cold niya", "bat ang cold niya", "cold replies", "dry replies",
      "dry siya mag chat", "ang tipid niya mag reply", "hindi na siya sweet", "iba na siya",
      "parang wala na siyang pake"
    ],
    responses: [
      "cold siya, wag mong painitin ego niya",
      "baka sign na yan",
      "hindi mo trabaho habulin ang lumalayo",
      "clarity over confusion",
      "protect your peace, bestie"
    ]
  },
  {
    triggers: [
      "goodnight mahal", "goodnight love", "goodnight sa kanya", "good night miss you",
      "goodnight kahit wala ka", "goodnight sa taong mahal ko", "tulog na mahal",
      "goodnight my love", "goodnight kahit di tayo", "goodnight kahit masakit"
    ],
    responses: [
      "goodnight yearner, pahinga ka na",
      "tulog na, wag na mag relapse",
      "sana mapanaginipan ka rin niya",
      "goodnight sa feelings mong pagod na",
      "sleep muna, overthink bukas nalang"
    ]
  },
  {
    triggers: [
      "stalk ko siya", "chineck ko profile niya", "tiningnan ko story niya", "viewed my story",
      "nag story siya", "active siya pero di nagreply", "online siya", "seen niya lang ako",
      "di niya ako sineen", "nag react siya"
    ],
    responses: [
      "stalking never helps 😭",
      "wag mo gawing detective era yan",
      "seen is not always a sign",
      "close app muna, protect peace",
      "wag mag decode ng bawat galaw"
    ]
  },
  {
    triggers: [
      "di ako pinili", "pinili niya iba", "may iba na siya", "may bago na siya", "replaced na ako",
      "pinalitan niya ako", "hindi ako enough", "bakit di ako", "ako nalang sana",
      "mas pinili niya siya"
    ],
    responses: [
      "hindi ibig sabihin kulang ka",
      "hindi ka replacement item",
      "you are enough, wrong person lang",
      "masakit pero hindi mo kasalanan lahat",
      "someday pipiliin ka nang buo"
    ]
  },
  {
    triggers: [
      "what if kami pa", "what if tayo pa", "what if di kami natapos", "what if bumalik",
      "what if ako pa rin", "what if mahal niya pa ako", "what if miss niya ako",
      "what if chat ko", "what if siya talaga", "what if hindi ko binitawan"
    ],
    responses: [
      "what if era hurts the most",
      "wag kang tumira sa what if",
      "focus sa what is, hindi what if",
      "minsan lesson lang talaga",
      "what if you choose yourself this time"
    ]
  },
  {
    triggers: [
      "di ko siya makalimutan", "paano siya kalimutan", "hirap kalimutan", "ayoko siya kalimutan",
      "di ko kaya mag move on", "move on na ba", "moving on hurts", "di pa ako naka move on",
      "hanggang ngayon siya pa rin", "siya pa rin talaga"
    ],
    responses: [
      "one day, hindi na ganito kasakit",
      "small steps lang sa moving on",
      "wag madaliin ang healing",
      "makakaya mo rin yan",
      "hindi ka stuck forever"
    ]
  },
  {
    triggers: [
      "ikaw pa rin", "siya pa rin", "ikaw lang talaga", "siya lang gusto ko",
      "walang iba", "ikaw lang mahal ko", "siya lang mahal ko", "ikaw pa rin pipiliin ko",
      "siya pa rin pipiliin ko", "ikaw ang pahinga ko"
    ],
    responses: [
      "grabe ang loyalty mo",
      "sweet pero ingat sa sarili",
      "ikaw pa rin, pero ikaw muna ngayon",
      "piliin mo rin sarili mo",
      "yearner level: loyal soldier"
    ]
  },
  {
    triggers: [
      "naalala ko siya", "naalala kita", "memories namin", "alaala niya", "bumalik memories",
      "nostalgia hits", "bigla ko siyang naalala", "naalala ko usapan namin", "naalala ko dati",
      "miss ko old us"
    ],
    responses: [
      "memories hit different talaga",
      "okay lang maalala, pero wag bumalik sa sakit",
      "old memories, new boundaries",
      "nostalgia is not always a sign",
      "dati yun, alagaan mo ngayon mo"
    ]
  },
  {
    triggers: [
      "kailan kaya kami", "kailan kaya siya babalik", "kailan kaya ako pipiliin",
      "kailan kaya magiging kami", "kailan kaya ako magiging okay", "kailan matatapos sakit",
      "kailan niya ako mamimiss", "kailan niya ako ichachat", "kailan niya marealize",
      "kailan ako magiging enough"
    ],
    responses: [
      "darating din clarity",
      "hindi lahat ng kailan may sagot agad",
      "for now, heal muna",
      "hindi mo kailangan hintayin lahat",
      "you are enough already"
    ]
  },
  {
    triggers: [
      "ayoko na pero miss ko", "pagod na ako pero mahal ko", "gusto ko na bumitaw",
      "di ko alam gagawin", "gulong gulo ako", "confused ako", "di ko alam kung lalaban",
      "lalaban pa ba ako", "bitaw na ba", "kapagod magmahal"
    ],
    responses: [
      "pagod ka na, pahinga muna",
      "love should not destroy you",
      "confusion is also an answer sometimes",
      "wag magdesisyon habang durog",
      "choose peace when love feels heavy"
    ]
  },
  {
    triggers: [
      "crush ko pa rin siya", "happy crush ko siya", "delulu ako", "delulu malala",
      "delulu era", "baka may chance", "may chance kaya", "feeling ko gusto niya ako",
      "nag assume ako", "kinikilig pa rin ako"
    ],
    responses: [
      "delulu responsibly 😭",
      "kilig lang, wag agad wedding plan",
      "baka sign, baka imagination",
      "soft crush era activated",
      "enjoy kilig, keep expectations low"
    ]
  },
  {
    triggers: [
      "seen lang", "delivered lang", "di nag reply", "di nag chat", "di ako nireplyan",
      "late reply siya", "hindi na nag update", "di na nag goodnight", "di na nag goodmorning",
      "di na siya nag care"
    ],
    responses: [
      "matched energy muna",
      "wag ka maghabol sa seen zone",
      "late reply, early pain",
      "di ka inbox decoration",
      "you deserve effort too"
    ]
  },
  {
    triggers: [
      "good morning mahal", "good morning love", "morning miss you", "umaga na miss pa rin kita",
      "gising na mahal", "good morning kahit wala ka", "good morning sa kanya",
      "morning thoughts siya", "siya agad naisip ko", "pag gising siya agad"
    ],
    responses: [
      "good morning yearner ☀️",
      "umaga palang relapse agad?",
      "kape muna bago feelings",
      "new day, same yearning",
      "start your day with self-love din"
    ]
  },
  {
    triggers: [
      "sino na mahal niya", "may mahal na ba siya", "may kausap na siya", "may nilalandi siya",
      "may bago na ba siya", "may crush na siya", "may girlfriend na siya", "may boyfriend na siya",
      "may jowa na siya", "di na ako mahal"
    ],
    responses: [
      "wag mo saktan sarili mo sa kakahula",
      "hindi lahat kailangan mong malaman",
      "curiosity can hurt, ingat",
      "focus sa peace mo",
      "kahit may iba, hindi ka nawalan ng value"
    ]
  },
  {
    triggers: [
      "sorry mahal", "sorry love", "sorry miss kita", "sorry kung mahal pa rin kita",
      "sorry kung makulit", "sorry kung naghihintay pa rin", "sorry kung nasaktan kita",
      "sorry kung bumalik ako", "sorry kung clingy ako", "sorry kung mahal kita"
    ],
    responses: [
      "sorry era hits hard",
      "accountability plus healing",
      "okay lang mag sorry, pero respect boundaries",
      "sincere sorry, quiet actions",
      "wag gawing excuse ang love"
    ]
  },
  {
    triggers: [
      "gusto ko siya makita", "gusto kita makita", "kita tayo ulit", "miss ko makita siya",
      "makita lang kita okay na", "gusto ko siyang puntahan", "puntahan ko ba siya",
      "sana makita kita", "one last kita", "last meet na"
    ],
    responses: [
      "one last meet usually not last 😭",
      "isip muna bago puntahan",
      "miss mo lang, wag biglang appear",
      "respect space muna",
      "seeing them might restart the pain"
    ]
  },
  {
    triggers: [
      "di ko kaya wala siya", "di ko kaya wala ka", "sanay ako sa kanya", "sanay ako sayo",
      "empty without you", "kulang araw ko", "kulang ako pag wala siya", "hinahanap hanap kita",
      "hinahanap ko siya", "parang kulang lahat"
    ],
    responses: [
      "you can learn to be okay again",
      "sanay ka lang, pero kakayanin mo",
      "empty ngayon, pero mapupuno ulit",
      "you existed before them too",
      "one day, hindi na ganito kabigat"
    ]
  }
];

const tagalogYearnLyrics = [
  "Kung pwede lang ibalik ang dati, hindi na sana kita binitawan.",
  "Sa bawat tahimik na gabi, pangalan mo pa rin ang dasal ko.",
  "Hindi ka na nandito, pero ikaw pa rin ang hinahanap ko.",
  "Pinilit kong kalimutan ka, pero puso ko ang ayaw sumunod.",
  "Kung tayo talaga, bakit parang ako lang ang lumalaban?",
  "Unti-unti kitang binitiwan, pero buong buo kitang minahal.",
  "Sa bawat ngiti ko, may lungkot na ikaw lang ang dahilan.",
  "Hindi ko alam kung saan ka nagsimula mawala sa akin.",
  "Hanggang ngayon, ikaw pa rin ang pahinga na hindi ko maabot.",
  "Sinubukan kong maging okay, pero ikaw pa rin ang kulang.",
  "Sa dami ng tao, ikaw pa rin ang hinahanap ng puso ko.",
  "Kung hindi tayo, bakit parang ikaw lang ang tama?",
  "Tinanggap ko na wala ka na, pero hindi pa rin ako sanay.",
  "Ang hirap maging matapang kung ikaw ang dahilan ng kahinaan ko.",
  "Kung pwede lang kalimutan, matagal na kitang binitawan.",
  "Sa bawat alaala, ikaw pa rin ang laman.",
  "Pinili kitang mahalin kahit hindi mo ako pinili.",
  "Hindi ka na bumalik, pero ako nandito pa rin.",
  "Ang sakit pala magmahal nang mag-isa.",
  "Hindi na tayo, pero ikaw pa rin ang gusto ko.",
  "Sa bawat patak ng ulan, ikaw ang naaalala ko.",
  "Kung may rewind lang, hindi kita hahayaang mawala.",
  "Tahimik na mundo, pero ang ingay ng puso ko para sayo.",
  "Ikaw ang kanta na hindi ko matapos.",
  "Sa huli, ako lang pala ang nag stay.",
  "Hindi ko kayang burahin ang ikaw sa puso ko.",
  "Kung pagmamahal ang laban, bakit ako ang talo?",
  "Pinilit kong maging okay kahit hindi.",
  "Ikaw pa rin kahit wala ka na.",
  "Mahal pa rin kita, kahit hindi na pwede.",
  "Kung ikaw ang sakit, bakit ikaw pa rin ang gusto?",
  "Hinintay kita, kahit hindi mo ako hinintay.",
  "Sa bawat araw, mas lalo kitang nami-miss.",
  "Hindi ko alam paano magsimula ulit nang wala ka.",
  "Ang daming sana, pero wala nang tayo.",
  "Ikaw pa rin ang pinakamagandang maling nangyari sa akin.",
  "Kung pagmamahal ang sukatan, sobra pa ang binigay ko.",
  "Iniwan mo ako, pero hindi kita iniwan sa puso ko.",
  "Kahit anong gawin ko, ikaw pa rin.",
  "Ang hirap mag move on kung ikaw pa rin ang gusto ko."
];

const flattenedTagalogYearnAutoResponses = {
  triggers: tagalogYearnAutoResponses.flatMap((entry) => entry.triggers),
  responses: [
    ...tagalogYearnAutoResponses.flatMap((entry) => entry.responses),
    ...tagalogYearnLyrics
  ]
};

const AUTO_RESPONSES = {
  yearning: {
    triggers: [
      "i miss you", "i miss her", "i miss him", "i miss them",
      "i miss us", "i still miss you", "wish you were here",
      "come back", "i want you here", "i need you here",
      "imissyou", "missyou", "imissyousomuch", "mingaw nko nimo",
      "mingaw ko niya", "i miss him so bad", "i miss her so bad",
      "i miss you na"
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
      "i love them", "love you", "i still love you", "iloveyou",
      "iloveu", "iloveyousomuch", "i love her so bad", "i love him so bad",
      "i love her so much", "i love you more"
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

const SOFT_COMMAND_NAMES = Object.keys(SOFT_COMMANDS);

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

// ⚡ instant reply
function delayedReply(message, text) {
  return message.reply(text).catch(() => {});
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

function buildConfessionButtons(messageId = 'new') {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(SUBMIT_CONFESSION_ID)
      .setLabel('Submit a Yearn!')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`${REPLY_CONFESSION_ID}:${messageId}`)
      .setLabel('Reply')
      .setStyle(ButtonStyle.Secondary)
  );
}

function buildConfessionEmbed(authorTag, confessionText, confessionNumber) {
  return new EmbedBuilder()
    .setColor(0x111827)
    .setTitle(`Anonymous Yearner (#${confessionNumber})`)
    .setDescription(`"${confessionText}"`)
    .setFooter({ text: `Submitted by ${authorTag}` });
}

// 🟢 ready 
client.once('ready', () => { 
  console.log(`Logged in as ${client.user.tag}`); 

  const softCommands = SOFT_COMMAND_NAMES.map((name) => ({
    name,
    description: `Send a soft ${name} message`,
    options: [
      {
        name: 'user',
        description: 'Who this message is for',
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  }));

  const slashCommands = [
    ...softCommands,
    {
      name: 'setupyearn',
      description: 'Create or set the yearn channel for this server'
    }
  ];

  client.application.commands.set(slashCommands)
    .then(() => console.log(`Registered ${slashCommands.length} slash commands.`))
    .catch((error) => console.error('Failed to register slash commands:', error));

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

  if (await handleYearn(message)) {
    return;
  }

  for (const category of Object.values(AUTO_RESPONSES)) {
    category.triggers = uniqueNormalized(category.triggers);
    category.responses = uniqueNormalized(category.responses);

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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (silent) {
    await interaction.reply({ content: '...i am quiet right now.', ephemeral: true });
    return;
  }

  const commandName = interaction.commandName;
  if (commandName === 'setupyearn') {
    if (!interaction.inGuild() || !interaction.guild) {
      await interaction.reply({ content: 'this command only works inside a server.', ephemeral: true });
      return;
    }

    const memberPermissions = interaction.memberPermissions;
    if (!memberPermissions?.has(PermissionsBitField.Flags.ManageChannels)) {
      await interaction.reply({ content: 'you need **Manage Channels** permission to use this.', ephemeral: true });
      return;
    }

    let yearnChannel = interaction.guild.channels.cache.find(
      (channel) => channel.type === ChannelType.GuildText && channel.name === 'yearn'
    );

    if (!yearnChannel) {
      yearnChannel = await interaction.guild.channels.create({
        name: 'yearn',
        type: ChannelType.GuildText,
        reason: `/setupyearn requested by ${interaction.user.tag}`
      });
    }

    yearnSetupChannels.set(interaction.guild.id, yearnChannel.id);

    const panelEmbed = new EmbedBuilder()
      .setColor(0x111827)
      .setTitle('Anonymous Yearner')
      .setDescription('Click **Submit a Yearn!** to post anonymously.');

    await yearnChannel.send({
      embeds: [panelEmbed],
      components: [buildConfessionButtons(CONFESSION_PANEL_ID)]
    });

    await interaction.reply({
      content: `yearn channel is ready: ${yearnChannel}. yearn submit button was posted.`,
      ephemeral: true
    });
    return;
  }

  if (!SOFT_COMMANDS[commandName]) return;

  const targetUser = interaction.options.getUser('user');
  if (!targetUser) {
    await interaction.reply({ content: 'mention someone for this command.', ephemeral: true });
    return;
  }

  const templates = SOFT_COMMANDS[commandName];
  const line = formatSoftLine(
    random(templates),
    interaction.member?.displayName || interaction.user.globalName || interaction.user.username,
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

  await interaction.reply({ embeds: [embed] });
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === SUBMIT_CONFESSION_ID) {
      const modal = new ModalBuilder()
        .setCustomId(CONFESSION_MODAL_ID)
        .setTitle('Submit Anonymous Yearn');

      const confessionInput = new TextInputBuilder()
        .setCustomId('confession_text')
        .setLabel('Your yearn')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(500)
        .setPlaceholder('Type what you want to yearn...');

      modal.addComponents(new ActionRowBuilder().addComponents(confessionInput));
      await interaction.showModal(modal);
      return;
    }

    if (interaction.customId.startsWith(`${REPLY_CONFESSION_ID}:`)) {
      const messageId = interaction.customId.split(':')[1];
      const modal = new ModalBuilder()
        .setCustomId(`${REPLY_MODAL_PREFIX}${messageId}`)
        .setTitle('Reply to Yearn');

      const replyInput = new TextInputBuilder()
        .setCustomId('reply_text')
        .setLabel('Your reply')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(400)
        .setPlaceholder('Write a supportive reply...');

      modal.addComponents(new ActionRowBuilder().addComponents(replyInput));
      await interaction.showModal(modal);
      return;
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === CONFESSION_MODAL_ID) {
      const confessionText = interaction.fields.getTextInputValue('confession_text').trim();
      const confessionNumber = Math.floor(1000 + Math.random() * 9000);
      const embed = buildConfessionEmbed(interaction.user.tag, confessionText, confessionNumber);

      const confessionMessage = await interaction.channel.send({
        embeds: [embed],
        components: [buildConfessionButtons('new')]
      });
      await confessionMessage.edit({ components: [buildConfessionButtons(confessionMessage.id)] });

      await interaction.reply({ content: 'your anonymous yearn has been posted.', ephemeral: true });
      return;
    }

    if (interaction.customId.startsWith(REPLY_MODAL_PREFIX)) {
      const replyText = interaction.fields.getTextInputValue('reply_text').trim();
      const messageId = interaction.customId.replace(REPLY_MODAL_PREFIX, '');

      let targetMessage = null;
      if (messageId && messageId !== 'new' && interaction.channel?.isTextBased()) {
        targetMessage = await interaction.channel.messages.fetch(messageId).catch(() => null);
      }

      const replyEmbed = new EmbedBuilder()
        .setColor(0x1f2937)
        .setTitle('Anonymous Reply')
        .setDescription(`"${replyText}"`);

      if (targetMessage) {
        await targetMessage.reply({ embeds: [replyEmbed] });
      } else {
        await interaction.channel.send({ embeds: [replyEmbed] });
      }

      await interaction.reply({ content: 'your anonymous reply has been posted.', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN); 
