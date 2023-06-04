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

// routes.get(
//     '/usuarios/:id',
//     authorizeUserByToken,
//     UserController.getByIdValidation,
//     UserController.getById
// )

// routes.put(
//     '/usuarios/:id',
//     authorizeUserByToken,
//     UserController.updateByIdValidation,
//     UserController.resultUpdateById
// )

// routes.delete( 
//     '/usuarios/:id',
//     authorizeUserByToken,
//     UserController.deleteByIdValidation,
//     UserController.deleteById
// )


export default routesTask

