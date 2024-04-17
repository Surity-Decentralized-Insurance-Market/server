import express from "express";
import exampleRouter from "./example";
import userRouter from "./user";
const router = express.Router();

router.use("/example", exampleRouter);
router.use("/user", userRouter);

router.get("/", (req, res) => {
  res.send(
    `Backend running successfully on ${
      req.protocol + "://" + req.get("host") + req.originalUrl
    }`
  );
});

export default router;
