import express from "express";
import exampleRouter from "./example";
import userRouter from "./user";
import policyRouter from "./policy";
import marketerRouter from "./marketer";
import functionsrRouter from "./functions";

const router = express.Router();

router.use("/example", exampleRouter);
router.use("/user", userRouter);
router.use("/marketer", marketerRouter);
router.use("/policy", policyRouter);
router.use("/functions", functionsrRouter);

// @ts-ignore
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong on the server" });
});

router.get("/", (req, res) => {
  res.send(
    `Backend running successfully on ${
      req.protocol + "://" + req.get("host") + req.originalUrl
    }`
  );
});

export default router;
