import { Request, Response } from "express";
import { CreateMessageUseCase } from "../../application/CreateMessageUseCase";
import { getAllUserUseCase } from "../../../user/infrastructure/dependencies";

export class CreateMessageController {
  constructor(readonly createMessageUseCase: CreateMessageUseCase) { }
  async run(req: Request, res: Response) {
    const data = req.body;
    // Verificar que el mensaje solo pueda ser enviado por un usuario existente
    const users = await getAllUserUseCase.run()
    if (users) {
      const usernameExists = users.find((user) => user.username === data.username);
      if (!usernameExists) {
        return res.status(400).send({
          status: "error",
          data: "Usuario no existente",
        });
      }
    }


    try {
      const message = await this.createMessageUseCase.run(
        data.username,
        data.content,
      );

      if (message)
        res.status(201).send({
          status: "success",
          data: {
            id: message?.id,
            username: message?.username,
            content: message?.content,
            date: message?.date
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "No fue posible crear el mensaje",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error D:",
        msn: error,
      });
    }
  }
}
