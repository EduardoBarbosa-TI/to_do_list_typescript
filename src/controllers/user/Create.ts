import { Request, Response } from "express"
import { IUser } from "../../models/User"
import { validation } from "../../shared/middlewares"
import * as yup from 'yup'
import bcrypt from 'bcrypt';
import { User } from "../../entidades/User"
import { AppDataSource } from "../../database/data-source"
import { StatusCodes } from "http-status-codes"

interface IBodyPropsValidation extends Omit<IUser, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyPropsValidation>(yup.object().shape({
        firstName: yup.string().required().min(3).max(150),
        lastName: yup.string().optional().min(3).max(150),
        email: yup.string().email().required(),
        password: yup.string().required()
    }))
}))



export const create = async (req: Request,res: Response)=> {
    const {password,firstName,lastName,email} = req.body
    
    const hashedPassword =  await bcrypt.hash(password,15)

    const user = new User()

    user.firstName = firstName
    user.lastName = lastName
    user.email= email
    user.password = hashedPassword
    
    try {
      AppDataSource.manager.save(user)

      return res.status(StatusCodes.CREATED).json({
        "message": "Usuário criado com sucesso!, id: " + user.id
    }) 
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
              default: error
            }
        })
    }
}



