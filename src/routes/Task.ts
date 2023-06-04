import { Router } from 'express'
import { TaskController, UserController } from '../controllers'

import { authorizeUserByToken } from '../auth'


const routesTask = Router()

routesTask.post(
    '/tarefas',
    authorizeUserByToken,
    TaskController.createValidation,
    TaskController.create,
)

routesTask.get(
    '/tarefas',
    authorizeUserByToken,
    TaskController.getAll
)

export default routesTask

