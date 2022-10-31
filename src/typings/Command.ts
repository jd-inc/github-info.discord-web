import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  ContextMenuInteraction,
  GuildMember,
  MessageApplicationCommandData,
  PermissionResolvable,
} from "discord.js";
import { ExtendedClient } from "../structures/Client";

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  client: ExtendedClient;
  interaction: ExtendedInteraction ;
  args: CommandInteractionOptionResolver;
}

interface RunOptions2 {
  client: ExtendedClient;
  interaction: ContextMenuInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;
type RunFunction2 = (options: RunOptions2) => any;

export type CommandType = {
  userPermissions?: PermissionResolvable[];
  run: RunFunction;
} & ChatInputApplicationCommandData;

export type ContextType = {
  userPermissions?: PermissionResolvable[];
  run: RunFunction2;
} & MessageApplicationCommandData;
