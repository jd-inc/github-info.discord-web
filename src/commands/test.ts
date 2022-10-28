import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Events, InteractionType } from 'discord.js';
import { CommandObject, CommandType } from "wokcommands";

export default {
  description: 'Button to add a role.',
  type: CommandType.SLASH,

  minArgs: 3,
  maxArgs: 3,
  expectedArgs: "<role-name> <button-title> <button-style>",

  options: [
    {
      name: 'role-name',
      description: 'sf',
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        {name: 'one', value: '1'}
      ]
    }
  ],
  

  callback: async ({client, args, interaction}: any) => {
    const [ role_name, button_title, button_style ] = args;

    interaction.reply({ components: [new ActionRowBuilder({
      components: [
        new ButtonBuilder({
          customId: `role-button-${role_name}`,
          label: `${button_title}`,
          style: ButtonStyle.Success,
        })
      ]
    })]});

    client.on(Events.InteractionCreate, async (interaction: any) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === `role-button-${role_name}`) {
        const user = interaction.guild.members.cache.get(interaction.member.user.id);
        const role = interaction.guild.roles.cache.find((role: any) => role.name === args[0]);

        user.roles.add(role);
      }
    });

    return 
  }
} as CommandObject;