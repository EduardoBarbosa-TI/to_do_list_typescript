import { Router } from 'express'
import { TaskController} from '../controllers'
import { TaskSchema } from '../schemas'
import { authorizeUserByToken } from '../shared/middlewares'


const routesTask = Router()

routesTask.use(authorizeUserByToken)

routesTask.post(
    '/tarefas',
    TaskSchema.bodyCreate,
    TaskController.create
)

routesTask.post(
    '/tarefas/:id',
    TaskSchema.params,
    TaskSchema.bodyCreate,
    TaskController.bindingTag
)

routesTask.get(
    '/tarefas',
    TaskController.getAll
)

routesTask.get(
    '/tarefas/:id',
    TaskSchema.params,
    TaskController.getById
)

routesTask.put(
    '/tarefas/:id',
    TaskSchema.bodyCreate,
    TaskSchema.params,
    TaskController.updateById
)

routesTask.delete(
    '/tarefas/:id',
    TaskSchema.params,
    TaskController.deleteById

)

export default routesTask

