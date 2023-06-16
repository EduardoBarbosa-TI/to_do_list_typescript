import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IQueryProps } from '../../schemas/task/QueryFilter' 
import { userRepository } from '../../repositories/UserRepository'

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  try {
    const users = await userRepository.find({ relations: ['tasks'] })
    return res.status(StatusCodes.OK).json({
      user: users
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: 'Erro ao listar usuários!'
      }
    })
  }
};