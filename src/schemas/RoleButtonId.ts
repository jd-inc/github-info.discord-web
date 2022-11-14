import { Schema, model } from "mongoose";

const RoleButtonId = new Schema({
  button_id: String
});

export default model<any>("Role-Button-Id", RoleButtonId);