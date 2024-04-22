import { Schema, model } from "mongoose";
import { Policy } from "../types/custom";

const policySchema = new Schema<Policy>({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  claimLimits: { type: { minimum: Number, maximum: Number } },
  durationLimits: { type: { minimum: Number, maximum: Number } },
  claimValidationFunction: {
    function: { type: String },
    description: { type: String },
    type: {
      arguments: {
        type: Array({ name: String, description: String, htmlType: String }),
        default: [],
      },
    },
  },
  premiumCalculationFunction: {
    function: { type: String },
    description: { type: String },
    type: {
      arguments: {
        type: Array({ name: String, description: String, htmlType: String }),
        default: [],
      },
    },
  },
  intialStake: { type: Number },
  tags: { type: Array(String), default: [] },
});

export default model<Policy>("Policy", policySchema);
