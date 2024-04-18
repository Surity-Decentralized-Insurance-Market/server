import { Schema, model } from "mongoose";
import { Marketer } from "../types/custom";

const marketerSchema = new Schema<Marketer>({
  name: { type: String },
  policies: { type: Array(String), default: [] },
  image: { type: String },
});

export default model<Marketer>("Marketer", marketerSchema);
