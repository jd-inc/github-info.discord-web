import "dotenv/config";
import { Client, IntentsBitField } from 'discord.js';
import ready from "./listeners/ready";

console.log("Bot is starting...");
const TOKEN = process.env.DISCORD_BOT_TOKEN;

const client: Client = new Client({
	intents: [
    IntentsBitField.Flags.AutoModerationExecution,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildBans,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildWebhooks,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageReactions,
	]
});
  client.login(TOKEN);
  
ready(client);