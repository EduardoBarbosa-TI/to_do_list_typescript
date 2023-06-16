import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRepository } from '../../repositories/UserRepository'

export const deleteById =  async (req: Request, res: Response) => {
    try {
        await userRepository.delete(req.params.id)
        return res.status(StatusCodes.OK).send()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: 'Erro ao deletar usuário!'
            }
        })
    }
}