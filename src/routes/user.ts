import { Router } from 'express'
import { UserController } from '../controllers'
import { authorizeUserByToken } from '../shared/middlewares/authenticator' 
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

