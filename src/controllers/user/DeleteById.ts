import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { validation } from '../../shared/middlewares'
import { AppDataSource } from '../../database/data-source'
import { User } from '../../entidades'

interface IParamProps{
    id?: string
}

export const deleteByIdValidation = validation(getSchema => ({
    params: getSchema<IParamProps>(yup.object().shape({
      id: yup.string().required(),
    }))
}))

export const deleteById =  async (req: Request<IParamProps>, res: Response) => {
    if(!req.params.id){
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }
    try {
        await AppDataSource.manager.delete(User,req.params.id)
        return res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: 'Erro ao deletar usuário!'
            }
        })
    }
}