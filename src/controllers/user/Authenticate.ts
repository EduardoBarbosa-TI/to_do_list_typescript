import { Request, Response } from "express"
import {comparePassword, getUserByEmail} from "../../entidades/User"
import { StatusCodes } from "http-status-codes"
import { gerarToken } from "../../auth/auth"
import { IUser } from "../../models"

export const authenticate = async (req: Request, res: Response): Promise<Response> => 
{
    const {email, password} = req.body

    try {

        const user = await getUserByEmail(email)
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).send({ message: 'Usuário não encontrado!' })
        }

        const passwordMatche = await comparePassword(password,user.password)
        if(!passwordMatche) return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Senha incorreta!' })
        
        return res.json({
            user: user,
            token: gerarToken(user as IUser)
        })
        
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
            default: error
        }
    })}
}

