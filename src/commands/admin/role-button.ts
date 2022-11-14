import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import RoleButtonId from "../../schemas/RoleButtonId";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'role-button',
  defaultMemberPermissions: 'ManageRoles',
  description: 'Создать сообщение с ролью по кнопке.',
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: "role",
      description: 'Выберите роль.',
      required: true,
      type: ApplicationCommandOptionType.Role
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
    const role = interaction.options.getRole('role');
    const button_title = interaction.options.getString('title');
    const button_style = interaction.options.getString('style');

    const customId = `role_btn_${role.name}`;
    const button_id_mongo = await RoleButtonId.findOne({ custom_id: customId});
    
    const ButtonStyles: ButtonStyle[] = [ButtonStyle.Success, ButtonStyle.Secondary, ButtonStyle.Primary, ButtonStyle.Danger];
    const AlternativeStyles: string[] = ['SUCCESS', 'SECONDARY', 'PRIMARY', 'DANGER'];
    const final_style: any = ButtonStyles[AlternativeStyles.indexOf(button_style.toUpperCase())]
    
    await interaction.reply({ 
      components: [
        new ActionRowBuilder({
          components: [
            new ButtonBuilder({
              customId: customId,
              label: `${button_title}`,
              style: final_style,
            })
          ]
        })
      ]
    });

    if(button_id_mongo.button_id) return
    else {
      const newId = await RoleButtonId.create({
        button_id: customId
      });

      const savedId = await newId.save();
      return;
    }
  }
})