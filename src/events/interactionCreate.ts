import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "../bot";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/Command";

export default new Event("interactionCreate", async (interaction) => {
  // Input Commands
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.followUp("You have used a non existent command");
    }

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });
  }
  // Context Menu 
  if (interaction.isContextMenu()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.followUp("You have used a non existent command");
    }

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });
  }

  process.on('unhandledRejection', (error: any)  => {
    console.error('Unhandled promise rejection:', error);
  });

  // function name(arr: any[], elem: string) {
  //   return arr.includes(elem);
  // }

  // client.on('interactionCreate', async (interaction: any) => {
  //   if (!interaction.isButton()) return;

  //   // need update
  //   const id_arr = ['test', 'test-1', 'test-2'];
  //   if (name(id_arr, interaction.customId)) {
  //     const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
  //     const role = interaction.guild.roles.cache.find((role: any) => role.name === interaction.customId);  
  //       click_user.roles.add(role);
    
  //     interaction.reply({ 
  //         content: `${interaction.customId}`,
  //         ephemeral: true
  //     })
  //   }
  // });
});
