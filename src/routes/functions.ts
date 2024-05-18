import express from "express";
import Policy from "../models/Policy";
import { spawn } from "child_process";
import fs from "fs";
const router = express.Router();

let lock: Promise<void> | null = null;

async function acquireLock() {
  while (lock) {
    await lock;
  }

  let releaseLock: () => void;

  lock = new Promise<void>((resolve) => {
    releaseLock = () => {
      lock = null;
      resolve();
    };
  });

  return releaseLock!;
}

router.post("/premium/:address", async (req, res) => {
  const releaseLock = await acquireLock();

  try {
    const policy = await Policy.findOne({ address: req.params.address });
    if (!policy?.premiumCalculationFunction) return res.sendStatus(404);

    fs.writeFileSync(
      "src/focus_func.txt",
      policy.premiumCalculationFunction.function
    );

    res.send("Idhar se output jaenga");
  } finally {
    releaseLock();
  }
});

export default router;
