import { Router } from 'express'
import { UserController } from '../controllers'

import { authorizeUserByToken } from '../auth'


const routes = Router()

routes.post(
    '/cadastro',
    UserController.createValidation,
    UserController.create   
)

routes.post(
    '/login',
    UserController.authValidation,
    UserController.authenticate
)

routes.get(
    '/usuarios',
    authorizeUserByToken,
    UserController.getAll
)

routes.get(
    '/usuarios/:id',
    authorizeUserByToken,
    UserController.getAll
)

export default routes

