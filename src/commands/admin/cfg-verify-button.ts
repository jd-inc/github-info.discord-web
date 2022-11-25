import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import VerifyButton from "../../schemas/VerifyButton";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'configurate-verify-button',
  description: 'Configurate the verify button.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: 'member_role',
      description: 'The server member role.',
      type: ApplicationCommandOptionType.Role,
      required: true
    },
    {
      name: 'default_role',
      description: 'Default server role.',
      type: ApplicationCommandOptionType.Role,
      required: true
    }
  ],

  run: async ({ interaction }) => {
    const default_role = interaction.options.get('default_role').role;
    const member_role = interaction.options.get('member_role').role;
    const config = await VerifyButton.find();

    if (!config[0]) {
      const newChannel = await VerifyButton.create({
        default_role_id: default_role.id,
        member_role_id: member_role.id
      });
  
      const savedChannel = await newChannel.save();      
    } else {
      const newChannel = await VerifyButton.updateMany({
        default_role_id: default_role.id,
        member_role_id: member_role.id
      });
    }

    interaction.reply({
      content: `
      Конфигурация кнопки верификации: 
        member role: ${member_role},
        default role: ${default_role}
      `,
      ephemeral: true
    });
  }
})