import { AppDataSource } from "../connection/data-source";
import { Task } from "../entidades";

export const taskRepository = AppDataSource.getRepository(Task)