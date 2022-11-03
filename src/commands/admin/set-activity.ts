import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "discord.js/typings/enums";
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