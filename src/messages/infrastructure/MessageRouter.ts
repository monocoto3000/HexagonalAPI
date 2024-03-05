import express from "express";
import { createMessageController, getAllMessageController, deleteMessageByIdController } from "./dependencies";
import rateLimit from "express-rate-limit";

const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // Intervalo
  max: 6, // Cantidad max de peticiones
  message: "Demasiadas peticiones realizadas, intenta despues de 1 hora"
});


export const messageRouter = express.Router();

messageRouter.get(
  "/", 
  getAllMessageController.run.bind(getAllMessageController),
);

messageRouter.post(
  "/",accountLimiter,
  createMessageController.run.bind(createMessageController),
);

messageRouter.delete(
  "/:id", accountLimiter,
  deleteMessageByIdController.run.bind(deleteMessageByIdController),
);

