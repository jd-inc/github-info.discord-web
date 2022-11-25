import { ContextType } from "../typings/ContextCommand";
import { CommandType } from "../typings/SlashCommand";

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