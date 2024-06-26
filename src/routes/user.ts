import express from "express";
import User from "../models/User";
import { generateRandomHex } from "../utils";
import { verifiedOnly } from "../middlewares/user";
import Marketer from "../models/Marketer";
import { recoverMessageAddress } from "viem";

const router = express.Router();

router.get("/check/:address", async (req, res) => {
  const user = await User.exists({ address: req.params.address });
  res.status(200).send({
    exists: user ? true : false,
  });
});

router.get("/get/:address", async (req, res) => {
  const user = await User.findOne({ address: req.params.address });
  res.status(200).send({ user: user });
});

const nonceStore: Record<string, string> = {};
router.post("/request-nonce", async (req, res) => {
  nonceStore[req.body.address] = generateRandomHex(32);
  res.status(200).send({ nonce: nonceStore[req.body.address] });
});

router.post("/verify", async (req, res) => {
  const signed = req.body.signedNonce;
  const expectedSigner = req.body.address;

  const address = await recoverMessageAddress({
    message: nonceStore[expectedSigner],
    signature: signed,
  });

  if (address != expectedSigner) return res.sendStatus(401);

  const user = await User.create({ address: expectedSigner });
  await user.save();

  res.status(200).send({ user: user ? user : false });
});

router.post("/become-marketer", verifiedOnly, async (req, res) => {
  const { name, imageUrl, signed } = req.body;

  const address = await recoverMessageAddress({
    message: JSON.stringify({ name, imageUrl }),
    signature: signed,
  });

  if (address != req.user.address) return res.sendStatus(401);

  if (!req.user) return res.sendStatus(401);
  const user = await User.findOne({ address: req.user.address });
  if (!user) return res.sendStatus(401);

  const newMarketer = await Marketer.create({
    name: name,
    image: imageUrl,
    address: req.user.address,
  });
  await newMarketer.save();

  await (
    await User.findOneAndUpdate(
      {
        address: req.user.address,
      },
      { marketer: newMarketer._id }
    )
  )?.save();

  return res.status(200).send({ marketer: newMarketer });
});

export default router;
