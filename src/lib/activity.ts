import { Client } from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

export default (client: Client): void => {
  client.user?.setPresence({
    activities: [{
      name: '/set-activity',
      type: ActivityTypes.PLAYING,
    }],
    status: 'online'
  })
  
  console.log('Activity set.');
}