import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares' 
import { AppDataSource } from '../../database/data-source'
import { User } from '../../entidades'

interface IQueryProps {
  id?: string
  page?: number
  limit?: number
  filter?: string
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    id: yup.string().optional(),
    filter: yup.string().optional(),
  }))
}))

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  try {
    const users = await AppDataSource.manager.find(User)
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