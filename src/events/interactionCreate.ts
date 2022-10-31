import { CommandInteractionOptionResolver, ContextMenuInteraction } from "discord.js";
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

  client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isButton()) return;
    const id_arr = ['role-button-test', 'role']
    for (let i = 0; i < id_arr.length; i++) {
      if (interaction.customId === `${id_arr[i]}`) {
        // const click_user = interaction.guild.members.cache.get(interaction.member.user.id);
        //   click_user.roles.add(role);
      
        // client.channels.cache.get(`${logs_channel.id}`).send(`User ${click_user} was given a role when clicking on the ${role} button.`);
        interaction.reply({ 
          content: `ok`,
          ephemeral: true
        })
        // console.log('second button work');
        
      }
    }
  });
});
