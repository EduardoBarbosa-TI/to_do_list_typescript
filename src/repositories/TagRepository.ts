import { AppDataSource } from "../connection/data-source";
import { Tag } from "../entidades";

export const tagRepository = AppDataSource.getRepository(Tag)