import { Client } from "discord.js";
import path from "path";
import WOK from "wokcommands";

import activity from "../lib/activity";

export default (client: Client): void => {
  client.on('ready', async () => {
    if(!client.user || !client.application) console.error('Oops, client or application error...');    
    activity(client);

    new WOK({
      client,
      commandsDir: path.join(__dirname, 'commands').replace(/listeners/gi, ''),
      disabledDefaultCommands: [
        "channelcommand",
        "customcommand",
        "prefix",
        "requiredpermissions",
        "requiredroles",
        "togglecommand",
      ]
    })

    console.log(`${client.user?.username} is online`);
  })
}