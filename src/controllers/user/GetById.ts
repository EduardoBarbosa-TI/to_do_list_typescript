import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IProps } from '../../schemas/user/Params'
import { User } from '../../entidades'
import { AppDataSource } from '../../database/data-source'

export const getById = async (req: Request<IProps>,  res: Response) => {
    const id = req.params.id

    try {
        const user = await AppDataSource.manager.findOne(User, { where: { id } });
        return res.status(StatusCodes.OK).json({
            user
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:{
                default: 'uuid inválido!'
            }
        })
    }
}