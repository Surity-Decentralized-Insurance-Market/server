import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import indexRouter from "./src/routes/_index";

import serverless from "serverless-http";

const PORT = Number(process.env.PORT) || 9000;

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded());

app.use("*", (req, res, next) => {
  console.log(req.baseUrl);
  next();
});

app.use("/.netlify/functions/api", indexRouter);

// async function main() {
//   await
//   app.listen(PORT, () => {
//     console.log(`server listening on port ${PORT}`);
//   });
// }
// main();

if (!process.env.MONGODB_URI) throw new Error("Connection URI missing");
mongoose.connect(process.env.MONGODB_URI);

export const handler = serverless(app);
