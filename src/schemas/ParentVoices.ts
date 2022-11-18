import { Schema, model } from "mongoose";

const ParentVoices = new Schema({
  guild_id: String,
  channel_id: String
});

export default model<any>("Parent-Voices", ParentVoices);