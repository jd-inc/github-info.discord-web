import { MessageActionRow, MessageButton, MessageButtonStyle } from "discord.js";
import { ApplicationCommandOptionTypes, ApplicationCommandTypes, MessageButtonStyles } from "discord.js/typings/enums";
import { SlashCommand } from "../../structures/Command";

export default new SlashCommand({
  name: 'role-button',
  description: 'Button to add a role.',
  type: ApplicationCommandTypes.CHAT_INPUT,

  options: [
    {
      name: "role",
      description: 'The name is required for the role without the <@> sign.',
      required: true,
      type: ApplicationCommandOptionTypes.STRING
    },
    {
      name: "title",
      description: 'The inscription that will be on the button.',
      required: true,
      type: ApplicationCommandOptionTypes.STRING
    },
    {
      name: "style",
      description: 'The color that the button will have.',
      required: true,
      type: ApplicationCommandOptionTypes.STRING,
      choices: [
        {name: 'Green', value: 'SUCCESS'},
        {name: 'Gray', value: 'SECONDARY'},
        {name: 'Blue', value: 'PRIMARY'},
        {name: 'Red', value: 'DANGER'},
      ]
    }
  ],
  
  run: async ({client, interaction}: any) => {
    const role_name = interaction.options.getString('role');
    const button_title = interaction.options.getString('title');
    const button_style = interaction.options.getString('style');
    
    const ChoiceValues: string[] = ['SUCCESS', 'SECONDARY', 'PRIMARY', 'DANGER'];
    const CurrentButtonStyle: any = ChoiceValues[ChoiceValues.indexOf(button_style)];    
    
    interaction.reply({ components: [new MessageActionRow({
      components: [
        new MessageButton({
          customId: `${role_name}`,
          label: `${button_title}`,
          style: CurrentButtonStyle,
        })
      ]
    })]});
  }
})