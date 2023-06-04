
import * as yup from 'yup'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validation } from "../../shared/middlewares"
import { getUserById } from '../../entidades'

interface IProps {
    id?: string 
}

export const getByIdValidation = validation(getSchema => ({
    params: getSchema<IProps>(yup.object().shape({
        id: yup.string().required()
    }))
}))

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