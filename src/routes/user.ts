import { Router } from 'express'
import UserController from '../controllers/UserController'

const routes = Router()

routes.get('/', (_,res) =>{
    return res.send("Hello, Dev!")
})

// routes.get('/usuarios',
//     //middlewares
//     UserController.index
// )

routes.post('/usuarios',UserController.index)



// routes.put('/usuarios',
//     //middlewares
//     UserController.index
// )

// routes.delete('/usuarios',
//     middlewares
//     UserController.delete
// )

export default routes

