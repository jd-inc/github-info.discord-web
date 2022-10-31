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
});
