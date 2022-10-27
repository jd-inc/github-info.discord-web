import { ActivityType } from "discord.js";
import { CommandObject, CommandType } from "wokcommands";

export default {
  description: 'Change activity text.',
  type: CommandType.SLASH,
	
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<activity text>',

  callback: ({args, client}: any) => {
		client.user?.setPresence({
			activities: [{
				name: `${args[0]}`,
				type: ActivityType.Playing,
			}],
			status: 'online'
		});
		
    return {
      content: `Activity chenged on ${args[0]}.`,
    }
  }
} as CommandObject