import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'role-button',
  defaultMemberPermissions: 'ManageRoles',
  description: 'Создать сообщение с ролью по кнопке.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "role",
      description: 'Имя роли без символа <@>.',
      required: true,
      type: ApplicationCommandOptionType.String
    },
    {
      name: "title",
      description: 'Текст кторый будет на кнопке.',
      required: true,
      type: ApplicationCommandOptionType.String
    },
    {
      name: "style",
      description: 'Стиль кнопки.',
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {name: 'Green', value: 'SUCCESS'},
        {name: 'Gray', value: 'SECONDARY'},
        {name: 'Blue', value: 'PRIMARY'},
        {name: 'Red', value: 'DANGER'},
      ]
    }
  ],
  
  run: async ({ interaction }: any) => {
    const role_name = interaction.options.getString('role');
    const button_title = interaction.options.getString('title');
    const button_style = interaction.options.getString('style');
    
    const ButtonStyles: ButtonStyle[] = [ButtonStyle.Success, ButtonStyle.Secondary, ButtonStyle.Primary, ButtonStyle.Danger];
    const AlternativeStyles: string[] = ['SUCCESS', 'SECONDARY', 'PRIMARY', 'DANGER'];
    const final_style: any = ButtonStyles[AlternativeStyles.indexOf(button_style.toUpperCase())]
    
    await  interaction.reply({ 
      components: [
        new ActionRowBuilder({
          components: [
            new ButtonBuilder({
              customId: `role_btn_${role_name}`,
              label: `${button_title}`,
              style: final_style,
            })
          ]
        })
      ]
    });
  }
})