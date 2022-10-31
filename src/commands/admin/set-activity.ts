import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "discord.js/typings/enums";
import getLogChannelId from "../../lib/get-log-channel-id";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'set-activity',
  description: 'Change activity text.',
  defaultMemberPermissions: "ADMINISTRATOR",
  type: ApplicationCommandTypes.CHAT_INPUT,

  options: [
    {
      name: 'activity-name',
      description: "Enter the acivity name.",
      type: ApplicationCommandOptionTypes.STRING,
      required: true
    },
  ],

  run: async ({ client, interaction }: any) => {
    const activity_name = interaction.options.getString('activity-name');
    const logs_channel: any = getLogChannelId(client);

		client.user?.setPresence({
			activities: [{
				name: `${activity_name}`,
				type: 0,
			}],
			status: 'online'
		});

    client.channels.cache.get(`${logs_channel.id}`).send(`Bot activity has been changed to: ${activity_name}.`);
    
    await interaction.reply({
      content: `Activity chenged on: ${activity_name}.`, 
      ephemeral: true}
    )
  }
})