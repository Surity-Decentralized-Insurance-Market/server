import express from "express";
import User from "../models/User";
import { generateRandomHex } from "../utils";
const router = express.Router();

router.post("/check-exists", async (req, res) => {
  const userExists = await User.exists({ address: req.body.address });
  res.json({ exists: userExists });
});

const nonceStore: Record<string, string> = {};
router.post("/request-nonce", async (req, res) => {
  nonceStore[req.body.address] = generateRandomHex(16);
  res.json({ nonce: nonceStore[req.body.address] });
});

router.post("/verify", async (req, res) => {
  const userExists = await User.exists({ address: req.body.address });
  res.json({ exists: userExists });
});

export default router;
