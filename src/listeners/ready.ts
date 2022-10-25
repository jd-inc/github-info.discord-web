import { Client } from "discord.js";
import activity from "../lib/activity";

export default (client: Client): void => {
  client.on('ready', async () => {
    if(!client.user || !client.application) console.error('Oops, client or application error...');    
      
    try {
      activity(client);
    } catch (error) {
      
    }
    
    console.log(`Success! ${client.user?.username} is online.`);
  })
}