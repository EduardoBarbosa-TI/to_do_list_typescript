import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getUserById } from '../../entidades'
import { IProps } from '../../schemas/user/Params'

export const getById = async (req: Request<IProps>,  res: Response) => {
    if(!req.params){
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors:{
                default: 'O parâmetro id precisa ser informado'
            }
        })
    }
    try {
        const result =  await getUserById(String(req.params.id))
        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:{
                default: 'uuid inválido!'
            }
        })
    }  
}