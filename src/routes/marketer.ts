import express from "express";
import Marketer from "../models/Marketer";
const router = express.Router();

router.get("/get/:address", async (req, res) => {
  const marketer = await Marketer.findOne({ address: req.params.address });
  res.status(200).send({ marketer: marketer });
});

export default router;
