import { 
  CommandInteractionOptionResolver, 
  ContextMenuCommandInteraction, 
  MessageApplicationCommandData, 
  PermissionResolvable } from "discord.js";
import { ExtendedClient } from "../structures/Client";

interface RunOptions {
  client: ExtendedClient;
  interaction: ContextMenuCommandInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type ContextType = {
  userPermissions?: PermissionResolvable[];
  run: RunFunction;
} & MessageApplicationCommandData;
