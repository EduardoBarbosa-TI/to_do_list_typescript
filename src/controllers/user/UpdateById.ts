import { Request, Response } from 'express'
import { IUser } from '../../models'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt';
import { updateById } from '../../entidades';
import { IBodyProps } from '../../schemas/user/BodyUpdate';
import { IProps } from '../../schemas/user/Params';

export const resultUpdateById =  async (req: Request<IProps,{},IBodyProps>,res: Response) => {
    const {password} = req.body
    if(password) req.body.password = await bcrypt.hash(password,15)

    try {
        const result = await updateById(String(req.params.id),req.body as IUser)
        return res.status(StatusCodes.NO_CONTENT).json(result)
    } catch (error) {
        
         return res.status(StatusCodes.NOT_FOUND).json({
            errors:{
                default: 'Usuário não encontrado! '
            }
        })
    }
}