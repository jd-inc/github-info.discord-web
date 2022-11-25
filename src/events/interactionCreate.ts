import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "../bot";
import { Event } from "../structures/Event";
import { ExtendedInteraction } from "../typings/SlashCommand";

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.followUp("You have used a non existent command");
    }

    await command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });
  }

  if (interaction.isContextMenuCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.followUp("You have used a non existent command");
    }

    await command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });
  }

  process.on("unhandledRejection", async (err) => {
    console.error("Unhandled Promise Rejection:\n", err);
  });

  process.on("uncaughtException", async (err) => {
    console.error("Uncaught Promise Exception:\n", err);
  });

  process.on("uncaughtExceptionMonitor", async (err) => {
    console.error("Uncaught Promise Exception (Monitor):\n", err);
  });
});
