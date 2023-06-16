import { Router } from "express";
import { TagController } from "../controllers";
import { TagSchema } from "../schemas";
import { authorizeUserByToken } from "../shared/middlewares";

const routesTag = Router()

routesTag.use(authorizeUserByToken)

routesTag.get(
    '/tags', 
    TagController.getAll
)

routesTag.get(
    '/tags/:id', 
    TagSchema.params,
    TagController.getbyId
)

routesTag.post(
    '/tags', 
    TagSchema.bodyCreate,
    TagController.create
)

routesTag.post(
    '/tags/:id',
    TagSchema.params,
    TagSchema.bodyCreate,
    TagController.bindingTask
)

routesTag.put(
    '/tags/:id', 
    TagSchema.params,
    TagSchema.bodyUpdate,
    TagController.updateById,
)

routesTag.delete(
    '/tags/:id', 
    TagSchema.params,
    TagController.deleteById
)

export default routesTag