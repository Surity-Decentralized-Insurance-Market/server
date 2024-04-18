import { RequestHandler } from "express";
import User from "../models/User";

export const verifiedOnly: RequestHandler = async (req, res, next) => {
  const address = req.headers.authorization;

  const user = await User.findOne({ address: address });
  if (user) {
    // @ts-ignore
    req.user = user;
    next();
  } else {
    return res.sendStatus(401);
  }
};
