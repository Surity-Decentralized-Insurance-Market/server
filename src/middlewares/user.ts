import { RequestHandler } from "express";
import User from "../models/User";

export const verifiedOnly: RequestHandler = async (req, res, next) => {
  const address = req.headers.authorization;

  const user = await User.findOne({ address: address });
  if (user) {
    req.user = user;
    next();
  } else {
    console.log("Suspected Malicious Request : " + address);
    return res.sendStatus(401);
  }
};
