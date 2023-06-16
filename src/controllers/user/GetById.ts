import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IProps } from '../../schemas/Params'
import { userRepository } from '../../repositories/UserRepository'

export const getById = async (req: Request<IProps>,  res: Response) => {
    const id = req.params.id
    try {
        const user = await userRepository.findOne({ where: { id } });
        return res.status(StatusCodes.OK).json({ user })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:{
                default: 'uuid inválido!'
            }
        })
    }
}