import { Client } from "discord.js";

export default (client: Client): void => {
  client.on('ready', async () => {
    if(!client.user || !client.application) console.error('Oops, client or application error...');    
      
    

    console.log(`Success! ${client.user?.username} is online.`);
  })
}