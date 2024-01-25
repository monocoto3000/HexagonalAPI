import { Request, Response } from "express";
import { GetAllUserUseCase } from "../../application/GetAllUserUseCase";


export class GetAllUserController {
  constructor(readonly getAllUserUseCase: GetAllUserUseCase) { }
  async run(req: Request, res: Response) {
    try {
      const users = await this.getAllUserUseCase.run();
      console.log(users);
      if (users)
        res.status(200).send({
          status: "success",
          data: users.map((users: any) => {
            return {
              id: users.id,
              name: users.name,
              last_name: users.last_name,
              second_last_name: users.second_last_name,
              username: users.username,
              email: users.email,
              password: users.password,
              birthday: users.birthday,
              age: users.age,
              registered_at: users.registered_at
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
