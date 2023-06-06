import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AppDataSource } from '../../database/data-source'
import { User } from '../../entidades'

export const deleteById =  async (req: Request, res: Response) => {
    try {
        await AppDataSource.manager.delete(User,req.params.id)
        return res.status(StatusCodes.OK).send()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: 'Erro ao deletar usuário!'
            }
        })
    }
}