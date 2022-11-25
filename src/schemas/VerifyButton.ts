import { model, Schema } from "mongoose";

const VerifyButton = new Schema({
  default_role_id: String,
  member_role_id: String
});

export default model<any>("Verify-Button", VerifyButton);