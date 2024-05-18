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

router.post("/:address", async (req, res) => {
  const releaseLock = await acquireLock();

  const { type } = req.query;

  if (!(type == "claim" || type == "premium")) {
    return res.sendStatus(400);
  }

  try {
    const policy = await Policy.findOne({ address: req.params.address });

    const functionToBeExecuted =
      type == "claim"
        ? policy?.claimValidationFunction
        : policy?.premiumCalculationFunction;

    if (!functionToBeExecuted) return res.sendStatus(404);

    let focus_function = functionToBeExecuted.function;
    const ff_lines = focus_function.split("\n");
    ff_lines[0] = ff_lines[0].replace(/\([^)]*\)/g, "()");

    const functionName = ff_lines[0].replace("def ", "").replace(":", "");

    focus_function = ff_lines.join("\n");

    Object.keys(req.body).forEach((key) => {
      focus_function = `${key} = ${req.body[key]}\n` + focus_function;
    });

    focus_function += `\n\nprint(${functionName})`;

    fs.writeFileSync("src/focus_func.py", focus_function);

    res.send("Idhar se output jaenga");
  } finally {
    releaseLock();
  }
});

export default router;
