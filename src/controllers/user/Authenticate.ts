import { Request, Response } from "express"
import {comparePassword} from "../../entities/User"
import { StatusCodes } from "http-status-codes"
import { gerarToken } from "../../shared/middlewares" 

import { userRepository } from "../../repositories/UserRepository"

export const authenticate = async (req: Request, res: Response): Promise<Response> => 
{
    const {email, password} = req.body
    const user = await userRepository.findOne({ where: { email } })

    if(!user){return res.status(StatusCodes.NOT_FOUND).send({ message: 'Usuário não encontrado!' })}

    const passwordMatche = await comparePassword(password,user.password)
    if(!passwordMatche) return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Senha incorreta!' })

    return res.json({
        user: user,
        token: gerarToken(user)
    })
}

