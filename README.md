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
