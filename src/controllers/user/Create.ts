import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { User } from "../../entidades/User"
import { AppDataSource } from "../../connection/data-source"
import { StatusCodes } from "http-status-codes"
import { userRepository } from "../../repositories/UserRepository";

export const create = async (req: Request,res: Response)=> {
    const {password,firstName,lastName,email} = req.body 
    const hashedPassword =  await bcrypt.hash(password,15)
    const user = new User(firstName,lastName,email,hashedPassword)

    try {
      (await userRepository.save(user)).id

      return res.status(StatusCodes.CREATED).json({
        "message": "Usuário criado com sucesso!, id: " + user.id
    }) 
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
              default: error
            }
        })
    }
}



