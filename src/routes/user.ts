import express from "express";
import User from "../models/User";
import { generateRandomHex, verifyMessage } from "../utils";
import { verifiedOnly } from "../middlewares/user";
import Marketer from "../models/Marketer";

const router = express.Router();

router.get("/check/:address", async (req, res) => {
  const user = await User.exists({ address: req.params.address });
  res.send({
    exists: user ? true : false,
  });
});

router.get("/get/:address", async (req, res) => {
  const user = await User.find({ address: req.params.address });
  res.send({ user: user });
});

const nonceStore: Record<string, string> = {};
router.post("/request-nonce", async (req, res) => {
  nonceStore[req.body.address] = generateRandomHex(32);
  res.send({ nonce: nonceStore[req.body.address] });
});

router.post("/verify", async (req, res) => {
  const signed = req.body.signedNonce;
  const expectedSigner = req.body.address;

  const address = verifyMessage(nonceStore[expectedSigner], signed);

  const user = await User.create({ address: expectedSigner });
  await user.save();

  res.status(200).send({ user: user });
});

router.post("/become-marketer", verifiedOnly, async (req, res) => {
  const { name, imageUrl } = req.body;
  const newMarketer = await Marketer.create({ name: name, imageUrl: imageUrl });
  await newMarketer.save();

  return res.status(200).send({ marketer: newMarketer });
});

export default router;
