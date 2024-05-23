import { ethers } from "ethers";
import faucet from "../contracts/faucet";

if (!process.env.SERVER_TRON_PRIVATE_KEY) throw new Error("Missing pvt key");

export const SERVER_TRON_ADDRESS = "TLcGTUX2w23e29gMLsxzzuAmXWizsUoR1u";
export const provider = new ethers.JsonRpcProvider(
  "https://pre-rpc.bt.io/",
  1029
);
export const wallet = new ethers.Wallet(
  process.env.SERVER_TRON_PRIVATE_KEY,
  provider
);

export const FaucetContract = new ethers.Contract(
  faucet.address,
  faucet.abi,
  wallet
);
