import { Schema, model } from "mongoose";

const CommandChannel = new Schema({
  guild_id: String,
  channel_id: String
});

export default model<any>("Command-Channels", CommandChannel);