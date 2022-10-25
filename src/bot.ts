import "dotenv/config";

import { Client, IntentsBitField } from 'discord.js';

console.log("Bot is starting...");
const TOKEN = process.env.DISCORD_BOT_TOKEN;

const client: Client = new Client({
	intents: [
		IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
	]
});
	client.login(TOKEN);
  client.on('ready', () => {
    console.log('Work again?!');
  })