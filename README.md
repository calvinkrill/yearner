# Yearning Bot

A moody Discord bot that blends melancholic ambient messages, soft roleplay-style commands, multilingual auto-replies, and an anonymous confession panel.

## Features

- **Ambient yearning system**
  - Posts hourly lines in random text channels.
  - Mood shifts every 30 minutes (`neutral`, `distant`, `intense`) to vary outputs.
  - Occasional glitch/edit-style delivery for dramatic effect.
  - Random silence periods where the bot goes quiet.
- **Classic yearning interactions**
  - Trigger-word replies for terms like `love`, `sleep`, and `bye`.
  - `!love @user` to set a “beloved” user the bot reacts to specially.
  - Rare lines and memory callback messages from stored chat snippets.
- **Auto-response packs (English + Filipino/Tagalog-heavy)**
  - Detects many longing/heartbreak patterns and sends quick supportive or playful replies.
  - Includes categories like missing someone, overthinking, waiting, loneliness, goodnight/goodmorning, and more.
- **Soft emotion commands (message and slash style)**
  - `/miss @user`
  - `/longfor @user`
  - `/wait @user`
  - `/yearn @user`
  - `/dream @user`
  - `/holdhand @user`
  - `/stay @user`
  - `/remember @user`
  - `/comfort @user`
  - `/promise @user`
  - Each command sends an embed with themed text + GIF pools, plus occasional rare GIF drops.
- **Anonymous confession panel**
  - `/setupyearn` creates/uses a `#yearn` channel and posts confession buttons.
  - “Submit a confession!” button opens a modal and posts anonymous confession embeds.
  - “Reply” button opens a reply modal and posts anonymous replies to a confession thread.

## Auto-response Triggers and Responses

When a trigger is detected, the bot replies with one of the following:
- `🎧` + a random lyric-style line from the lyric pool.
- `💔` + a random generated response built from opener + middle + ending phrase parts.

### Trigger Categories (all current trigger phrases)

#### miss
- miss na kita
- namimiss kita
- miss ko siya
- miss ko na siya
- miss kita sobra
- miss na miss kita
- namimiss pa rin kita
- miss ko boses mo
- miss ko tawa mo
- miss ko yakap mo
- miss ko ikaw
- miss ko siya ngayon
- miss ko pa rin
- sobrang miss kita
- namimiss kita gabi gabi
- miss kita araw araw
- hinahanap kita
- hinahanap ko siya
- hinahanap pa rin kita
- miss ko presensya mo
- miss ko chat mo
- miss ko goodnight mo
- miss ko good morning mo
- miss ko kulit mo
- miss ko lambing mo
- namimiss ko lahat sayo
- miss kita kahit wala ka na
- miss pa rin kita kahit tapos na
- miss kita kahit di pwede
- miss kita kahit masakit
- miss kita kahit ako lang

#### mahal
- mahal pa rin kita
- mahal ko pa siya
- love ko pa rin siya
- mahal kita hanggang ngayon
- may feelings pa ako
- gusto ko pa rin siya
- di pa rin nawawala feelings ko
- mahal pa rin kita kahit wala na
- mahal pa rin kita kahit masakit
- mahal kita kahit hindi pwede
- mahal kita kahit tapos na
- mahal ko pa rin siya kahit may iba na
- mahal pa rin kita kahit ako nalang
- gusto ko pa rin siya kahit di ako pinili
- mahal kita kahit hindi tayo
- love ko pa rin siya kahit wala na kami

#### chat
- chat ko na ba
- ichachat ko ba
- mag chat na ba ako
- replyan ko ba
- send ko na ba
- dm ko na ba
- ichachat ko na siya
- chat ko ba siya ngayon
- mag message ba ako sa kanya
- send ko na ba message ko
- replyan ko na ba siya
- mag dm na ba ako
- kausapin ko na ba siya
- mag reach out ba ako
- mag sorry ba ako sa kanya
- ichachat ko ba kahit gabi na
- chat ko ba kahit seen lang

#### sana
- sana tayo ulit
- sana kami ulit
- sana bumalik
- sana piliin niya ako
- sana ako nalang
- sana bumalik siya sa akin
- sana tayo pa rin
- sana hindi natapos
- sana hindi kami naghiwalay
- sana ako ang pinili
- sana may chance pa
- sana pwede pa
- sana maayos pa
- sana hindi nawala
- sana hindi siya nagbago

#### seen
- seen lang
- delivered lang
- di nag reply
- late reply siya
- dry replies
- di niya ako nireplyan
- seen niya lang ako
- online siya pero di nag reply
- active siya pero di ako pinansin
- late siya mag reply
- di na siya nag update
- di na siya nag goodnight
- di na siya nag good morning
- di na siya nag chat
- di na siya nag effort

#### moveon
- di ko siya makalimutan
- paano siya kalimutan
- hirap kalimutan
- di ko kaya mag move on
- di pa ako naka move on
- hanggang ngayon siya pa rin
- siya pa rin talaga
- di ko mabitawan
- di ko ma let go
- di ako maka move on
- hirap mag move on
- moving on hurts
- di ko kaya kalimutan siya
- di ko kaya mawala siya

### Static Response Packs (used as building blocks)

#### Lyric pool (`🎧`)
- Kung pwede lang ibalik ang dati, hindi na sana kita binitawan.
- Sa bawat tahimik na gabi, pangalan mo pa rin ang dasal ko.
- Hindi ka na nandito, pero ikaw pa rin ang hinahanap ko.
- Pinilit kong kalimutan ka, pero puso ko ang ayaw sumunod.
- Kung tayo talaga, bakit parang ako lang ang lumalaban?
- Unti-unti kitang binitiwan, pero buong buo kitang minahal.
- Sa dami ng tao, ikaw pa rin ang hinahanap ng puso ko.
- Hindi na tayo, pero ikaw pa rin ang gusto ko.
- Ang sakit pala magmahal nang mag-isa.
- Mahal pa rin kita, kahit hindi na pwede.

#### Generated reply parts (`💔`)

**Openers**
- miss mo lang yan
- yearner spotted
- hinga muna
- wag muna mag relapse
- protect your peace
- piliin mo sarili mo
- soft heart detected
- valid yan
- wag maghabol
- healing muna

**Middles**
- pero wag mo muna i-chat
- pero alagaan mo rin sarili mo
- kasi pagod na rin puso mo
- kasi hindi lahat dapat balikan
- kahit masakit ngayon
- kahit siya pa rin ang laman ng isip mo
- kahit hindi madali
- kahit may what if pa
- kahit namimiss mo siya
- kahit gusto mo siyang balikan

**Endings**
- 😭
- 💔
- 🫂
- okay?
- bestie.
- yearner era malala.
- pahinga ka muna.
- wag ubusin sarili.
- love yourself din.
- kakayanin mo yan.

> Note: Generated responses are combined as `opener + middle + ending`, deduplicated, and capped at 900 variants.

## Requirements

- Node.js 18+ (recommended)
- A Discord bot application with token
- Bot invited to your server with permissions to:
  - Read/send messages
  - Use slash commands
  - Embed links
  - Manage channels (required for `/setupyearn`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```env
   TOKEN=your_discord_bot_token_here
   ```
3. Start the bot:
   ```bash
   node index.js
   ```

## Usage

- **Run server setup for confessions**
  - Use `/setupyearn` (must have **Manage Channels**).
  - Bot will create/find `#yearn` and post confession panel buttons.
- **Use soft commands**
  - Slash command form: `/miss user:@someone`
  - Message form also works, e.g. `/miss @someone`
- **Set beloved user behavior**
  - `!love @user`

## Notes

- All state is in-memory (mood, beloved user, memories, setup map). Restarting the process resets it.
- Slash commands are registered when the bot starts.
- If the bot is in a silence window, it may ignore both message and slash interactions temporarily.
