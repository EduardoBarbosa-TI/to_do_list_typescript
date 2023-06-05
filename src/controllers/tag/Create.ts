import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import { ITag } from "../../models";
import * as yup from 'yup'
import { Tag } from "../../entidades";
import { StatusCodes } from "http-status-codes";
 
interface IBodyProps extends Omit<ITag,'id'> {}

export const createValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        titulo: yup.string().required().min(5).max(20)
    }))
}))

export const create = async (req: Request,res: Response) => {
    const { titulo } = req.body  

    const tag = new Tag
    tag.titulo = titulo

    try {
        await tag.save()
        return res.status(StatusCodes.CREATED).json({
            message: 'Tag adicionado com sucesso!, ' + tag.id
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao cadastrar tag!'
            }
        })
    }
}