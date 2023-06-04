import { Router } from 'express'
import { UserController } from '../controllers'
import { authorizeUserByToken } from '../auth'

const routesUser = Router()

routesUser.post(
    '/cadastro',
    UserController.createValidation,
    UserController.create   
)

routesUser.post(
    '/login',
    UserController.authValidation,
    UserController.authenticate
)

routesUser.get(
    '/usuarios',
    authorizeUserByToken,
    UserController.getAll
)

routesUser.get(
    '/usuarios/:id',
    authorizeUserByToken,
    UserController.getByIdValidation,
    UserController.getById
)

routesUser.put(
    '/usuarios/:id',
    authorizeUserByToken,
    UserController.updateByIdValidation,
    UserController.resultUpdateById
)

routesUser.delete( 
    '/usuarios/:id',
    authorizeUserByToken,
    UserController.deleteByIdValidation,
    UserController.deleteById
)

export default routesUser

