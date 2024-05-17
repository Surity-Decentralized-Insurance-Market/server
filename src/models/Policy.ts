import { Schema, model } from "mongoose";
import { Policy } from "../types/custom";

const policySchema = new Schema<Policy>({
  address: { type: String, unique: true },
  name: { type: String },
  description: { type: String },
  category: { type: String },
  claimLimits: { minimum: Number, maximum: Number },
  durationLimits: { minimum: Number, maximum: Number },
  claimValidationFunction: {
    function: String,
    description: String,
    arguments: [{ name: String, description: String, htmlType: String }],
  },
  premiumCalculationFunction: {
    function: String,
    description: String,
    arguments: [{ name: String, description: String, htmlType: String }],
  },
  intialStake: { type: Number },
  tags: [String],
});

export default model<Policy>("Policy", policySchema);
