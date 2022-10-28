import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, } from 'discord.js';
import { CommandObject, CommandType } from "wokcommands";

export default {
  description: 'Button to add a role.',
  type: CommandType.SLASH,

  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<role-name>",

  callback: async ({client, args, interaction}: any) => {
    interaction.reply({ components: [new ActionRowBuilder({
      components: [
        new ButtonBuilder({
          customId: 'button-one',
          label: 'Click me',
          style: ButtonStyle.Success,
        })
      ]
    })] 
    });

    client.on(Events.InteractionCreate, (interaction: any) => {
      if (!interaction.isButton()) return;
      if (interaction.customId === 'button-one') {
        let user = interaction.guild.members.cache.get(interaction.member.user.id);
        let role = interaction.guild.roles.cache.find((role: any) => role.name === args[0]);

        user.roles.add(role);
      }
    });
  }
} as CommandObject;