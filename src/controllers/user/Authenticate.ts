import { Request, Response } from "express"
import {User, comparePassword} from "../../entidades/User"
import { StatusCodes } from "http-status-codes"
import { gerarToken } from "../../auth/auth"
import { IUser } from "../../models"
import { AppDataSource } from "../../database/data-source"

export const authenticate = async (req: Request, res: Response): Promise<Response> => 
{
    const {email, password} = req.body
    const user = await AppDataSource.manager.findOne(User, { where: { email } })

    if(!user){return res.status(StatusCodes.NOT_FOUND).send({ message: 'Usuário não encontrado!' })}

    const passwordMatche = await comparePassword(password,user.password)
    if(!passwordMatche) return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Senha incorreta!' })

    return res.json({
        user: user,
        token: gerarToken(user as IUser)
    })
}

