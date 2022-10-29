import { ModalBuilder, TextInputBuilder } from '@discordjs/builders';
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, Events, InteractionType, TextInputStyle } from 'discord.js';
import { CommandObject, CommandType } from "wokcommands";

export default {
  description: 'Button to add a role.',
  type: CommandType.SLASH,

  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<role-name>"/* <button-title> <button-style>*/,

  // options: [
  //   {
  //     name: 'role-name',
  //     description: 'sf',
  //     required: true,
  //     type: ApplicationCommandOptionType.String,
  //     choices: [
  //       {name: 'one', value: '1'}
  //     ]
  //   }
  // ],
  

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

    const modal = new ModalBuilder()
      .setCustomId('myModal')
      .setTitle('My Modal');

    // Add components to modal

    // Create the text input components
    // for (let i = 0; i < args[0]; i++) {
    const favoriteColorInput = new TextInputBuilder()
      .setCustomId('favoriteColorInput')
        // The label is the prompt the user sees for this input
      .setLabel("What's your favorite color?")
        // Short means only a single line of text
      .setStyle(TextInputStyle.Short);

      const favoriteColor = new TextInputBuilder()
      .setCustomId('favoriteColor')
        // The label is the prompt the user sees for this input
      .setLabel("What's your favorite color?")
        // Short means only a single line of text
      .setStyle(TextInputStyle.Short);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow: any[] = [new ActionRowBuilder().addComponents(favoriteColorInput), new ActionRowBuilder().addComponents(favoriteColor)];
    //     firstActionRow.push(new ActionRowBuilder().addComponents(favoriteColorInput))
    //   }
      modal.addComponents(...firstActionRow);
      console.log(modal);
      
    // Add inputs to the modal
    
    client.on(Events.InteractionCreate, async (interaction: any) => {
      //   if (!interaction.isButton()) return;
      //   if (interaction.customId === `role-button-${role_name}`) {
        //     const user = interaction.guild.members.cache.get(interaction.member.user.id);
        //     const role = interaction.guild.roles.cache.find((role: any) => role.name === args[0]);
        
        //     user.roles.add(role);
        //   }
        await interaction.showModal(modal);
    });

    
  }
} as CommandObject;