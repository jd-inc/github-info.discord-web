import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'set-activity',
  description: 'Смена текста активности бота.',
  defaultMemberPermissions: 'Administrator',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: 'activity-name',
      description: "Введите имя активности бота.",
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
      content: `Aктивность бота изменена на: ${activity_name}.`, 
      ephemeral: true}
    )
  }
})