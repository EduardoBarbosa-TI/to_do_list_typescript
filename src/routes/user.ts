import { Router } from 'express'
import { UserController } from '../controllers'
import { authorizeUserByToken } from '../auth'
import { TaskSchema, UserSchema } from '../schemas'


const routesUser = Router()

routesUser.post(
    '/cadastro',
    UserSchema.bodyRegister,
    UserController.create   
)

routesUser.post(
    '/login',
    UserSchema.bodyLogin,
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
    UserSchema.params,
    UserController.getById
)

routesUser.put(
    '/usuarios/:id',
    authorizeUserByToken,
    UserSchema.bodyUpdate,
    UserSchema.params,
    UserController.resultUpdateById
)

routesUser.delete( 
    '/usuarios/:id',
    authorizeUserByToken,
    UserSchema.params,
    UserController.deleteById
)

export default routesUser

