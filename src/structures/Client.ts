import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import glob from "glob";
import mongoose from "mongoose";
import { promisify } from "util";
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();
  voiceGenerator: Collection<string, string> = new Collection();

  constructor() {
    super({ intents: [
      "MessageContent",
      "DirectMessages",
      "Guilds",
      "GuildBans",
      "GuildMembers",
      "GuildWebhooks",
      "GuildMessages",
      "GuildPresences",
      "GuildVoiceStates",
      "GuildIntegrations",
      "GuildInvites"
    ] });
  }

  start() {
    this.registerModules();
    this.connectionToMOngoose();

    this.login(process.env.BOT_TOKEN);
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log("Registering global commands");
    }
  }

  async connectionToMOngoose() {
    if(!process.env.MONGO_URI) return;
    let connected: boolean = false;

    try {
      mongoose.connect(process.env.MONGO_URI, {
        keepAlive: true,
      })
      connected = true;
    } catch (error) {
      throw new Error(`${error}`);      
    }

    if(connected) console.log('DB connected');    
  }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    );
    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
      console.log(command);

      this.commands.set(command.name, command);
      slashCommands.push(command);
    });

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.GUILD_ID,
      });
    });

    // Event
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
