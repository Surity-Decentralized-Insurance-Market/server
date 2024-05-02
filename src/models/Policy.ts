import { Schema, model } from "mongoose";
import { Policy } from "../types/custom";

const functionArgsSchema = new Schema({
  type: [{ name: String, description: String, htmlType: String }],
  default: [],
});

const policySchema = new Schema<Policy>({
  address: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: String },
  claimLimits: { minimum: Number, maximum: Number },
  durationLimits: { minimum: Number, maximum: Number },
  claimValidationFunction: {
    function: String,
    description: String,
    arguments: functionArgsSchema,
  },
  premiumCalculationFunction: {
    function: String,
    description: String,
    arguments: functionArgsSchema,
  },
  intialStake: { type: Number },
  tags: [String],
});

export default model<Policy>("Policy", policySchema);
