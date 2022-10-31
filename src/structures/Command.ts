import { CommandType, ContextType } from "../typings/Command";

export class SlashCommand {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions);
  }
}

export class ContextCommand {
  constructor(commandOptions: ContextType) {
    Object.assign(this, commandOptions);
  }
}  