import { CreateMessageUseCase } from "../application/CreateMessageUseCase";
import { GetAllMessageUseCase } from "../application/GetAllMessageUseCase";
import { DeleteByIdMessageUseCase } from "../application/DeleteMessageUseCase";

import { MysqlMessageRepository } from "./MysqlMessageRepository";

import { GetAllMessageController } from "./controllers/GetAllMessageController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { DeleteMessageController } from "./controllers/DeleteMessageByIdController";
import { AMQPMessageQueueService } from "./Adapters/AmqpQueueService";

export const mysqlMessageRepository = new MysqlMessageRepository();
export const amqpMessageQueueService = new AMQPMessageQueueService("amqp://localhost:5672");

export const createMessageUseCase = new CreateMessageUseCase(mysqlMessageRepository,amqpMessageQueueService);
export const getAllMessageUseCase = new GetAllMessageUseCase(mysqlMessageRepository);
export const deleteByIdMessageUseCase = new DeleteByIdMessageUseCase(mysqlMessageRepository);

export const createMessageController = new CreateMessageController(createMessageUseCase);
export const getAllMessageController = new GetAllMessageController(getAllMessageUseCase);
export const deleteMessageByIdController = new DeleteMessageController(deleteByIdMessageUseCase);


