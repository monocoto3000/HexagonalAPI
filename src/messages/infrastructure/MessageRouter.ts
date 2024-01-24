import express from "express";

import { createMessageController } from "./dependencies";
import { getAllMessageController } from "./dependencies";

export const messageRouter = express.Router();

messageRouter.get(
  "/",
  getAllMessageController.run.bind(getAllMessageController)
);
messageRouter.post(
  "/",
  createMessageController.run.bind(createMessageController)
);