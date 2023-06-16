import { Router } from 'express'
import { UserController } from '../controllers'

import { TaskSchema, UserSchema } from '../schemas'
import { authorizeUserByToken } from '../shared/middlewares'


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

routesUser.use(authorizeUserByToken)

routesUser.get(
    '/usuarios',
    UserController.getAll
)

routesUser.get(
    '/usuarios/:id',
    UserSchema.params,
    UserController.getById
)

routesUser.put(
    '/usuarios/:id',
    UserSchema.bodyUpdate,
    UserSchema.params,
    UserController.updateById
)

routesUser.delete( 
    '/usuarios/:id',
    UserSchema.params,
    UserController.deleteById
)

export default routesUser

