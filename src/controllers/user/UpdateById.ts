import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt';
import { userRepository } from '../../repositories/UserRepository';

export const updateById =  async (req: Request,res: Response) => {
    const {password} = req.body
    if(password) req.body.password = await bcrypt.hash(password,15)
    try {
        userRepository.update(req.params.id,req.body)
        return res.status(StatusCodes.OK).json({
            message: 'Usuário atualizado com sucesso!'
        })
    } catch (error) {
         return res.status(StatusCodes.NOT_FOUND).json({
            errors:{
                default: 'Usuário não encontrado! '
            }
        })
    }
}