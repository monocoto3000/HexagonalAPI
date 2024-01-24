import { CreateMessageUseCase } from "../application/CreateMessageUseCase";
import { GetAllMessageUseCase } from "../application/GetAllMessageUseCase";

import { MysqlMessageRepository } from "./MysqlMessageRepository";

import { GetAllMessageController } from "./controllers/GetAllMessageController";
import { CreateMessageController } from "./controllers/CreateMessageController";

export const mysqlMessageRepository = new MysqlMessageRepository();
export const createMessageUseCase = new CreateMessageUseCase(mysqlMessageRepository);
export const getAllMessageUseCase = new GetAllMessageUseCase(mysqlMessageRepository);
export const createMessageController = new CreateMessageController(createMessageUseCase);
export const getAllMessageController = new GetAllMessageController(getAllMessageUseCase);


