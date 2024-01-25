import express from "express";

import { createUserController } from "./dependencies";
import { getAllUserController } from "./dependencies";

export const UserRouter = express.Router();

UserRouter.get(
  "/",
  getAllUserController.run.bind(getAllUserController)
);
UserRouter.post(
  "/",
  createUserController.run.bind(createUserController)
);