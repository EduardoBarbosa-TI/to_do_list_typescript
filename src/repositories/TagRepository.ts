import { AppDataSource } from "../data-source";
import { Tag } from "../entities";

export const tagRepository = AppDataSource.getRepository(Tag)