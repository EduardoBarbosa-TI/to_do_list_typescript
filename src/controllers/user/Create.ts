import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { User } from "../../entidades/User"
import { AppDataSource } from "../../database/data-source"
import { StatusCodes } from "http-status-codes"

export const create = async (req: Request,res: Response)=> {
    const {password,firstName,lastName,email} = req.body
    
    const hashedPassword =  await bcrypt.hash(password,15)

    const user = new User()

    user.firstName = firstName
    user.lastName = lastName
    user.email= email
    user.password = hashedPassword
    
    try {
      (await AppDataSource.manager.save(user)).hasId

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



