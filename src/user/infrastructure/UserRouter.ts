import express, { Request, Response } from "express";
import { createUserController, getAllUserController } from "./dependencies";

export const UserRouter = express.Router();

UserRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await getAllUserController.run(req, res);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
});

UserRouter.post("/", async (req: Request, res: Response) => {
  try {
    const result = await createUserController.run(req, res);
    return res.status(201).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error");
  }
});