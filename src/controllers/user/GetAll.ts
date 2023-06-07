import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AppDataSource } from '../../database/data-source'
import { User } from '../../entidades'
import { IQueryProps } from '../../schemas/task/QueryFilter' 

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  try {
    const users = await AppDataSource.manager.find(User, { relations: ['tasks'] })
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