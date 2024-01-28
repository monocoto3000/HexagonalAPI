import express from "express";

import { createMessageController, getAllMessageController } from "./dependencies";

export const messageRouter = express.Router();

messageRouter.get("/", async function(req, res) {
  try {
    const result = await getAllMessageController.run(req, res);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
});

messageRouter.post("/", async function(req, res) {
  try {
    const result = await createMessageController.run(req, res);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
});

