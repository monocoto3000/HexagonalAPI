import express from "express";
import { createUserController, getAllUserController } from "./dependencies";

export const UserRouter = express.Router();

UserRouter.get(
  "/",
  getAllUserController.run.bind(getAllUserController)
);

UserRouter.post(
  "/",
  createUserController.run.bind(createUserController)
);