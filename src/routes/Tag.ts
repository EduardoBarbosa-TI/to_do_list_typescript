import { Router } from "express";
import routesTask from "./Task";
import { authorizeUserByToken } from "../auth";
import { TagController } from "../controllers";
import { TagSchema } from "../schemas";

const routesTag = Router()

routesTag.get(
    '/tags', 
    authorizeUserByToken,
    TagController.getAll
)

routesTag.get(
    '/tags/:id', 
    authorizeUserByToken,
    TagSchema.params,
    TagController.getbyId
)

routesTag.post(
    '/tags', 
    authorizeUserByToken,
    TagSchema.bodyCreate,
    TagController.create
)

routesTask.post(
    '/tags/:id',
    authorizeUserByToken,
    TagSchema.params,
    TagSchema.bodyCreate,
    TagController.bindingTask
)

routesTag.put(
    '/tags/:id', 
    authorizeUserByToken,
    TagSchema.params,
    TagSchema.bodyUpdate,
    TagController.updateById,
)

routesTag.delete(
    '/tags/:id', 
    authorizeUserByToken,
    TagSchema.params,
    TagController.deleteById
)

export default routesTag