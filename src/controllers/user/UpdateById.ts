import * as yup from 'yup'

import { Request, Response } from 'express'
import { IUser } from '../../models'
import { validation } from '../../shared/middlewares'
import { getUserById, updateById } from '../../entidades'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt';

interface IParamsProps{
    id?: string
}

interface IBodyProps {
    firstName?: string
    lastName?: string
    password?: string
    email?: string
}

export const updateByIdValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        firstName: yup.string().optional().min(3).max(150),
        lastName: yup.string().optional().min(3).max(150),
        password: yup.string().optional().min(3).max(8),
        email: yup.string().email().optional(),
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.string().required()
    }))
}))

export const resultUpdateById =  async (req: Request<IParamsProps,{},IBodyProps>,res: Response) => {
    const {password} = req.body
    try {
       const user = await getUserById(String(req.params.id)) 
    } catch (error) {
         return res.status(StatusCodes.NOT_FOUND).json({
            errors:{
                default: 'Usuário não encontrado! '
            }
        })
    }
   
    if(password){
        const hashedPassword =  await bcrypt.hash(password,15)
        req.body.password = hashedPassword
    }

    if(!req.params.id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
          default: 'O parâmetro "id" precisa ser informado'
        }
      })
    }

    try {
        const result = await updateById(String(req.params.id),req.body as IUser)
        return res.status(StatusCodes.NO_CONTENT).json(result)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: error
            }
        })
    }
}