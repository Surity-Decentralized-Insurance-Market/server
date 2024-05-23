import express from "express";
import { FaucetContract } from "../config";

const router = express.Router();

router.get("/request/:address", async (req, res) => {
  const { address } = req.params;

  try {
    await FaucetContract.request(address);
    res.status(200).send({ message: "success" });
  } catch (err: any) {
    res.status(500).send({ error: err.revert.args[0] || err.message | err });
  }
});

router.get("/balance", async (req, res) => {
  try {
    const balance = await FaucetContract.balance();
    res.send({ balance: Number(balance) });
  } catch (err: any) {
    res.status(500).send({ error: err.revert.args[0] || err.message | err });
  }
});

router.get("/configuration", async (req, res) => {
  try {
    const defaultTimeout = await FaucetContract.defaultTimeout();
    const tokensPerRequest = await FaucetContract.tokensPerRequest();
    res.send({
      defaultTimeout: Number(defaultTimeout),
      tokensPerRequest: Number(tokensPerRequest),
    });
  } catch (err: any) {
    res.status(500).send({ error: err.revert.args[0] || err.message | err });
  }
});

router.get("/next-request-time/:address", async (req, res) => {
  try {
    const nextTime = await FaucetContract.nextRequestTime(req.params.address);
    res.send({ time: Number(nextTime) });
  } catch (err: any) {
    res.status(500).send({ error: err.revert.args[0] || err.message | err });
  }
});

export default router;
