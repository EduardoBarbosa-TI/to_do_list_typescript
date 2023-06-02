import { Router } from 'express'
import { UserController } from '../controllers'



const routes = Router()



routes.post(
    '/cadastro',
    UserController.createValidation,
    UserController.createValidation,
    UserController.create   
)


// routes.put('/usuarios/:id',
//     //middlewares
//     UserController.index
// )

// routes.delete('/usuarios/:id',
//     middlewares
//     UserController.delete
// )

export default routes

