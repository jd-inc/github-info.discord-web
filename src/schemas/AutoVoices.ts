import { Schema, model } from "mongoose";

const AutoVoices = new Schema({
  channel_id: String,
  owner_id: String,
  is_open: Boolean
});

export default model<any>("Auto-Voices", AutoVoices);