import express from "express";
import { verifiedOnly } from "../middlewares/user";
import Marketer from "../models/Marketer";
import Policy from "../models/Policy";
const router = express.Router();

router.post("/new", verifiedOnly, async (req, res) => {
  if (!req.user) return res.sendStatus(401);
  if (!req.user.marketer) return res.sendStatus(403);

  const marketer = await Marketer.findById(req.user.marketer);
  if (!marketer) return res.sendStatus(403);

  const newPolicy = await Policy.create({
    address: req.body.insuranceContractAddress,
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    owner: req.user.address,
    claimLimits: {
      minimum: req.body.minimumClaim,
      maximum: req.body.maximumClaim,
    },
    durationLimits: {
      minimum: req.body.minimumDuration,
      maximum: req.body.maximumDuration,
    },
    claimValidationFunction: {
      function: req.body.claimFunction.trim(),
      description: req.body.claimFuncDescription,
      arguments: req.body.claimFunctionArguments,
    },
    premiumCalculationFunction: {
      function: req.body.premiumFunction.trim(),
      description: req.body.premiumFuncDescription,
      arguments: req.body.premiumFunctionArguments,
    },
    tags: req.body.tags,
    intialStake: req.body.intialStake,
  });

  await newPolicy.save();

  await Marketer.findByIdAndUpdate(marketer.id, {
    $push: { policies: newPolicy.id },
  });

  res
    .status(200)
    .send({ message: "Policy created successfully", Policy: newPolicy });
});

router.get("/get/:address", async (req, res) => {
  const { address } = req.params;

  const policy = await Policy.findOne({ address: address });

  return res.status(200).send({ policy });
});

router.get("/fetch-all", async (req, res) => {
  const policies = await Policy.find();

  return res.status(200).send({ policies: policies });
});

export default router;
