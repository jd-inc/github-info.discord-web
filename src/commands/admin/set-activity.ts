import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'set-activity',
  description: 'Change activity text.',
  // userPermissions: 
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: 'activity-name',
      description: "Enter the acivity name.",
      type: ApplicationCommandOptionType.String,
      required: true
    },
  ],

  run: async ({ client, interaction }: any) => {
    const activity_name = interaction.options.getString('activity-name');

		client.user?.setPresence({
			activities: [{
				name: `${activity_name}`,
				type: 0,
			}],
			status: 'online'
		});

    await interaction.reply({
      content: `Activity chenged on: ${activity_name}.`, 
      ephemeral: true}
    )
  }
})