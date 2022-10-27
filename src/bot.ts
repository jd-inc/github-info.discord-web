import "dotenv/config";
import { Client, IntentsBitField, REST, Routes} from 'discord.js';

import ready from "./listeners/ready";

console.log("Bot is starting...");

const TOKEN: any = process.env.DISCORD_BOT_TOKEN;

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
//Для очиски комманд

// const rest = new REST({ version: '10' }).setToken(TOKEN);
// rest.put(Routes.applicationCommands('1034374338784268349'), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);

ready(client);

client.login(TOKEN);