import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IBodyProps } from '../../schemas/user/BodyUpdate';
import { IProps } from '../../schemas/Params';
import { AppDataSource } from '../../database/data-source';
import { User } from '../../entidades';
import bcrypt from 'bcrypt';

export const resultUpdateById =  async (req: Request<IProps,{},IBodyProps>,res: Response) => {
    const {password} = req.body
    if(password) req.body.password = await bcrypt.hash(password,15)
    try {
        AppDataSource.manager.update(User,req.params.id,req.body)
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