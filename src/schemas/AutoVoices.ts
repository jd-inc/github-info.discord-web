import { Schema, model } from "mongoose";

const AutoVoices = new Schema({
  user_id: String,
  channel_id: String
});

export default model<any>("Auto-Voices", AutoVoices);