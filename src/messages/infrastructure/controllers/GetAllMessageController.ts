import { Request, Response } from "express";
import { GetAllMessageUseCase } from "../../application/GetAllMessageUseCase";


export class GetAllMessageController {
  constructor(readonly getAllMessageUseCase: GetAllMessageUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const messages = await this.getAllMessageUseCase.run();
      console.log(messages);
      if (messages)
        res.status(200).send({
          status: "success",
          data: messages.map((messages: any) => {
            return {
              id: messages.id,
              username: messages.username,
              content: messages.content,
              date: messages.date,
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio un error D:",
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
