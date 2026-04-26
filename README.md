# Yearning Bot

A moody Discord bot for late-night longing: ambient quotes, multilingual auto-replies (Tagalog/English/Bisaya), soft interaction commands with GIF embeds, and an anonymous confession panel.

## What’s included

### 1) Ambient yearning behavior
- Rotating mood system (`neutral`, `distant`, `intense`) that changes every 30 minutes.
- Random silence windows where the bot temporarily stops replying.
- Timed quote drops every 10 minutes in random text channels (when not in silent mode).
- Occasional rare/deep lines, glitch-style lines, memory callbacks, and delayed/edit effects for atmosphere.

### 2) Auto-response engine (900+ style replies)
- Uses `yearnAutoResponse.js` as the primary heartbreak/longing responder.
- Trigger coverage includes categories like:
  - `miss`
  - `mahal`
  - `chat`
  - `sana`
  - `seen`
  - `moveon`
  - `relapse`
- Supports mixed-language trigger phrases (English, Tagalog, Bisaya/Cebuano).
- Reply output is shuffled to reduce repeats and can include:
  - `💬` category response
  - `💔` generated “yearner” line
  - `🎧` lyric-style line
  - `🕯️` quote-style line

### 3) Optional AI replies (OpenAI-compatible)
- If `OPENAI_API_KEY` is set, triggered yearn messages have a chance to return an AI-generated poetic reply.
- Uses OpenAI-compatible `chat/completions` endpoint settings from env vars.
- AI replies can be toggled per server via `/yearnsettings ai_replies:true|false`.

### 4) Typing simulation (NEW)
- Before many replies, the bot simulates typing for a short moment.
- Sometimes it types, pauses, and sends nothing to add realism and tension.

### 5) Sound / music integration
- Yearn responses can occasionally include song references.
- Sometimes drops a mood-based playlist link with lines like:
  - `this reminds me of something…` + a song.

### 6) Soft emotion commands (slash + message style)
Supported command names:
- `/miss`
- `/longfor`
- `/wait`
- `/yearn`
- `/dream`
- `/holdhand`
- `/stay`
- `/remember`
- `/comfort`
- `/promise`
- `/slap`
- `/poke`
- `/kiss`
- `/touch`

Each command:
- Requires a target user.
- Sends a themed embed line.
- Attaches a GIF from category pools.
- Has a rare chance to swap in a rare GIF.

Message-style variants also work if the first token matches a command name and a user is mentioned, e.g.:
- `miss @user`
- `/miss @user`

### 7) Anonymous Yearn panel
- `/setupyearn` creates (or reuses) a `#yearn` text channel.
- Posts a panel with:
  - **Submit a Yearn!** button (opens modal)
  - **Reply** button (opens reply modal for a specific entry)
- Anonymous yearns are posted as embeds and auto-numbered (starting at `#1` for new yearn channels).
- Replies are posted as anonymous embeds attached to the target confession when possible.
- Queueing logic prevents confession-number collisions during rapid submissions.

### 8) Server settings (admin configurable)
- `/yearnsettings` supports:
  - Toggle AI replies
  - Adjust mood speed (`mood_speed_minutes`)
  - Enable/disable silence mode
  - Set a specific quote channel
  - Control random response frequency (`1-100%`)

### 9) Legacy trigger interactions
- Keyword trigger replies for words like `love`, `sleep`, and `bye`.
- `!love @user` sets a “beloved” user ID for special reactions.

## Requirements
- Node.js 18+
- Discord bot token
- Bot invited with permissions for:
  - Send Messages
  - Read Message History
  - Embed Links
  - Use Application Commands
  - Manage Channels (required for `/setupyearn`)

## Installation

```bash
npm install
```

## Environment variables
Create a `.env` file in project root:

```env
# Required
TOKEN=your_discord_bot_token

# Optional (AI responses)
OPENAI_API_KEY=your_openai_or_compatible_api_key
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-3.5-turbo
```

## Run

```bash
node index.js
```

## NPM scripts

```bash
npm test
```

Current test script performs a syntax check on `index.js`.

## Behavior notes
- Slash commands are registered globally when the bot is ready.
- In silent mode, both message handling and slash-command interactions can be temporarily suppressed.
- Runtime state is in-memory (mood, beloved user, caches/queues), so restarting the process resets temporary state.
- The repository currently keeps a large local `node_modules/` directory present in workspace; only source files are required for normal version control.

## Project files
- `index.js` — main bot runtime, commands, ambient behavior, confession panel.
- `yearnAutoResponse.js` — yearn trigger matching + generated responses + optional AI response path.
- `timelyQuotes.js` — large multilingual quote pool used by timed drops and mention replies.
