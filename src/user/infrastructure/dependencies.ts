import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { GetAllUserUseCase } from "../application/GetAllUserUseCase";

import { MysqlUserRepository } from "./MysqlUserRepository";

import { GetAllUserController } from "./controllers/GetAllUserController";
import { CreateUserController } from "./controllers/CreateUserController";

export const mysqlUserRepository = new MysqlUserRepository();
export const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
export const getAllUserUseCase = new GetAllUserUseCase(mysqlUserRepository);
export const createUserController = new CreateUserController(createUserUseCase, getAllUserUseCase);
export const getAllUserController = new GetAllUserController(getAllUserUseCase);


