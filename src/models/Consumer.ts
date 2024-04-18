import { Schema, model } from "mongoose";
import { Consumer } from "../types/custom";

const consumerSchema = new Schema<Consumer>({
  address: { type: String },
  marketer: { type: String },
});

export default model<Consumer>("Consumer", consumerSchema);
