# Yearning Bot

A moody Discord bot that posts wistful, melancholic messages and occasionally replies to users with "yearns."

## Features

- Hourly ambient yearning messages in random text channels.
- Mood system (`neutral`, `distant`, `intense`) that changes responses over time.
- Trigger-word replies for words like `love`, `sleep`, and `bye`.
- Rare and glitch-style lines for variety.
- Optional "beloved" user behavior via `!love @user`.
- Lightweight in-memory memory callbacks.
- Soft emotion commands with aesthetic embeds:
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
- Command-specific GIF categories (rain/night/comfort/waiting/etc.) with rare GIF surprises.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file:
   ```env
   TOKEN=your_discord_bot_token_here
   ```
3. Start the bot:
   ```bash
   node index.js
   ```

## Usage

- Use `!love @user` to set a user the bot yearns for.
- Use soft commands like `/miss @user` and `/comfort @user` to send calm, emotion-themed embeds.
- Talk in channels where the bot can read/send messages.

## Notes

- The bot uses in-memory state; restarting clears mood history and memories.
- Ensure your bot has permissions to read and send messages in server channels.
