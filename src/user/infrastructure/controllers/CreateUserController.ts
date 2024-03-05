import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { GetAllUserUseCase } from "../../application/GetAllUserUseCase";
import { BcryptPasswordEncryptor } from "../Adapters/BcryptAdapter";

export class CreateUserController {
  constructor(
    readonly createuserUseCase: CreateUserUseCase,
    readonly getAlluserUseCase: GetAllUserUseCase
  ) { }

  //Generar edad automaticamente por fecha de nacimiento
  calculateAge(birthday: Date): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  async run(req: Request, res: Response) {

    //Datos del body 
    const data = req.body;

    // Verificar longitud de contraseña
    if (data.password.length < 8) {
      return res.status(400).send({
        status: "error",
        data: "La contraseña debe tener al menos 8 caracteres D:",
      });
    }

    //Verficar existencia de email y/o username
    const users = await this.getAlluserUseCase.run()
    if (users) {
      //Mon apuntes 🤓☝️
      //.some comprueba si un elemento del array cumple con una condición, y nos devuelve un booleano
      const emailExists = users.some((user) => user.email === data.email);
      const usernameExists = users.some((user) => user.username === data.username);
      if (emailExists || usernameExists) {
        return res.status(400).send({
          status: "error",
          data: "El correo o nombre de usuario no se encuentran disponibles D:",
        });
      }
    }

    const age = this.calculateAge(data.birthday);
    // Formato de POST AAAA-MM-DD
    try {
      const hashedPassword = await BcryptPasswordEncryptor.hashPassword(data.password); // Hashear la contraseña
      const user = await this.createuserUseCase.run({
        name: data.name,
        last_name: data.last_name,
        second_last_name: data.second_last_name,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        birthday: data.birthday,
        age: age,
      });
      if (user)
        res.status(201).send({
          status: "success",
          data: {
            id: user?.id,
            name: user?.name,
            last_name: user?.last_name,
            second_last_name: user?.second_last_name,
            username: user?.username,
            email: user?.email,
            password: user?.password,
            birthday: new Date(user?.birthday),
            age: user?.age,
            registred_at: user?.registered_at
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "No fue posible crear el usuario",
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
