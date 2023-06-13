import { AppDataSource } from "../connection/data-source";
import { User } from "../entidades";

export const userRepository = AppDataSource.getRepository(User)