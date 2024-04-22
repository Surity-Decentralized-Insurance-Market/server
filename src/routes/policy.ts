import express from "express";
import { verifiedOnly } from "../middlewares/user";
import Marketer from "../models/Marketer";
const router = express.Router();

router.post("/new", verifiedOnly, (req, res) => {
  if (!req.user) return res.sendStatus(401);
  if (!req.user.marketer) return res.sendStatus(403);

  const marketer = Marketer.findById(req.user.marketer);
  if (!marketer) return res.sendStatus(403);

  const newPolicy = {};
});

export default router;
