import { AppDataSource } from "../data-source";
import { Task } from "../entities";

export const taskRepository = AppDataSource.getRepository(Task)