import { Router } from 'express'
import { TaskController} from '../controllers'
import { authorizeUserByToken } from '../auth'
import { TaskSchema } from '../schemas'


const routesTask = Router()

routesTask.post(
    '/tarefas',
    authorizeUserByToken,
    TaskSchema.bodyCreate,
    TaskController.create
)

routesTask.post(
    '/tarefas/:id',
    authorizeUserByToken,
    TaskSchema.params,
    TaskController.registerTag
)

routesTask.get(
    '/tarefas',
    authorizeUserByToken,
    TaskController.getAll
)

routesTask.get(
    '/tarefas/:id',
    authorizeUserByToken,
    TaskSchema.params,
    TaskController.getById
)

routesTask.put(
    '/tarefas/:id',
    authorizeUserByToken,
    TaskSchema.bodyCreate,
    TaskSchema.params,
    TaskController.updateById
)

routesTask.delete(
    '/tarefas/:id',
    authorizeUserByToken,
    TaskSchema.params,
    TaskController.deleteById

)

export default routesTask

