import express from "express";
import { FaucetContract } from "../config";

const router = express.Router();

router.get("/request/:address", async (req, res) => {
  const { address } = req.params;

  try {
    await FaucetContract.request(address);
    res.status(200).send({ message: "success" });
  } catch (err: any) {
    res.status(500).send({ message: err.message.reason || err.message | err });
  }
});

router.get("/balance", async (req, res) => {
  try {
    const balance = await FaucetContract.balance();
    res.send({ balance });
  } catch (err: any) {
    res.status(500).send({ message: err.message.reason || err.message | err });
  }
});

router.get("/configuration", async (req, res) => {
  try {
    const defaultTimeout = await FaucetContract.defaultTimeout();
    const tokensPerRequest = await FaucetContract.tokensPerRequest();
    res.send({ defaultTimeout, tokensPerRequest });
  } catch (err: any) {
    res.status(500).send({ message: err.message.reason || err.message | err });
  }
});

router.get("/next-request-time/:address", async (req, res) => {
  try {
    const nextTime = await FaucetContract.nextRequestTime(req.params.address);
    res.send({ time: nextTime });
  } catch (err: any) {
    res.status(500).send({ message: err.message.reason || err.message | err });
  }
});

export default router;
