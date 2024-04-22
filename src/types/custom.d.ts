import "node";

interface User {
  address: string;
  marketer?: string;
}

interface Marketer {
  name: string;
  address: string;
  image: string;
  policies: string[];
}

interface Policy {
  name: string;
  description: string;
  category: string;
  claimLimits: { minimum: number; maximum: number };
  durationLimits: { minimum: number; maximum: number };
  claimValidationFunction?: {
    function: string;
    arguments: { name: string; description: string; htmlType: string }[];
    description: string;
  };
  premiumCalculationFunction?: {
    function: string;
    arguments: { name: string; description: string; htmlType: string }[];
    description: string;
  };
  intialStake: number;
  tags: string[];
}
