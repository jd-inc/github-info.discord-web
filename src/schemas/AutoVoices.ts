import { Schema, model } from "mongoose";

const AutoVoices = new Schema({
  channel_id: String,
  owner_id: String
});

export default model<any>("Auto-Voices", AutoVoices);