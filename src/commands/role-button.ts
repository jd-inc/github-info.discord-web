import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
import { CommandObject, CommandType } from "wokcommands";

export default {
  description: 'Button to add a role.',
  type: CommandType.SLASH,

  minArgs: 3,
  maxArgs: 3,
  expectedArgs: "<role> <title> <style>",

  options: [
    {
      name: "role",
      description: 'The name is required for the role without the <@> sign.',
      required: true,
      type: ApplicationCommandOptionType.String
    },
    {
      name: "title",
      description: 'The inscription that will be on the button.',
      required: true,
      type: ApplicationCommandOptionType.String
    },
    {
      name: "style",
      description: 'The color that the button will have.',
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {name: 'Green', value: 'SUCCESS'},
        {name: 'Gray', value: 'SECONDSRY'},
        {name: 'Blue', value: 'PRIMARY'},
        {name: 'Red', value: 'DANGER'},
      ]
    }
  ],
  

  callback: async ({client, args, interaction}: any) => {
    const [ role_name, button_title, button_style ] = args;

    const ChoiceValues: string[] = ['SUCCESS', 'SECONDSRY', 'PRIMARY', 'DANGER'];
    const ButtonStyleArr: ButtonStyle[] = [ButtonStyle.Success, ButtonStyle.Secondary, ButtonStyle.Primary, ButtonStyle.Danger];
    const CurrentButtonStyle = ButtonStyleArr[ChoiceValues.indexOf(button_style)];

    interaction.reply({ components: [new ActionRowBuilder({
      components: [
        new ButtonBuilder({
          customId: `role-button-${role_name}`,
          label: `${button_title}`,
          style: CurrentButtonStyle,
        })
      ]
    })]});

    client.on(Events.InteractionCreate, async (interaction: any) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === `role-button-${role_name}`) {
        const user = interaction.guild.members.cache.get(interaction.member.user.id);
        const role = interaction.guild.roles.cache.find((role: any) => role.name === args[0]);
        
        user.roles.add(role);

        interaction.reply({ 
          content: `Role added: @${role_name}`,
          ephemeral: true
        })
      }
    });
  }
} as CommandObject;