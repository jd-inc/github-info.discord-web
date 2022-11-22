import { Schema, model } from "mongoose";

const AutoVoices = new Schema({
  channel_id: String,
  owner_id: String,
  is_open: Boolean,
  users_limit: Number
});

export default model<any>("Auto-Voices", AutoVoices);