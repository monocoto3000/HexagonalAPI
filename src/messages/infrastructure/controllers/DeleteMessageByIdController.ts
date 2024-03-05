import { Request, Response } from "express";
import { DeleteByIdMessageUseCase } from "../../application/DeleteMessageUseCase";

export class DeleteMessageController {
  constructor(readonly deleteMessageByIdUseCase: DeleteByIdMessageUseCase) { }
  async run(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      await this.deleteMessageByIdUseCase.run(id);
      res.status(200).send({
        status: "success",
        data: {
          message: "Producto eliminado correctamente",
        },
      });
    } catch (error) {
      res.status(500).send({
        status: "error",
        data: "Ocurrió un error al intentar eliminar el producto",
        error: error,
      });
    }
  }
}
