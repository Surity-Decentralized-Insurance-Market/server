import express from "express";
import exampleRouter from "./example";
const router = express.Router();

router.use("/example", exampleRouter);

router.get("/", (req, res) => {
  res.send(
    `Backend running successfully on ${
      req.protocol + "://" + req.get("host") + req.originalUrl
    }`
  );
});

export default router;
