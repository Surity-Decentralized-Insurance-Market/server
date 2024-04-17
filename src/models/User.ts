import { Schema, model } from "mongoose";

interface IUser {
  address: string;
  verified: boolean;
  isMarketer: boolean;
}

const userSchema = new Schema<IUser>({
  address: { type: String },
  verified: { type: Boolean, default: false },
  isMarketer: { type: Boolean, default: false },
});

export default model<IUser>("User", userSchema);
