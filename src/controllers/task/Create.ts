import { Request, Response } from "express"
import { validation } from "../../shared/middlewares"
import { ITag, ITask, IUser } from "../../models"
import * as yup from 'yup'
import { Tag, Task, User } from "../../entidades"
import { AppDataSource } from "../../database/data-source"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"

interface IBodyProps extends Omit<ITask, 'id'>{}

export const createValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        titulo: yup.string().required().max(20),
        descricao: yup.string().required().max(100)
    })) 
}))

export const create = async (req: Request,res: Response) => {
    const token = req.query.token || req.headers['x-access-token'];
    const {titulo, descricao} = req.body

    const task =  new Task()

    task.titulo = titulo
    task.descricao = descricao
    
    try {
        const userToken = jwt.verify(token as string , 'SECRET') as IUser;
        const user = await AppDataSource.manager.findOne(User, { where: { id: userToken.id } })

        if(!user){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Usuário não encontrado!'
            })
        }

        task.user = user 
        await task.save()

        return res.status(StatusCodes.CREATED).json({
            message: 'Tarefa adicionada com sucesso!, id: ' + task.id
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: {
                default: 'Erro ao cadastrar tarefa!'
            }
        })
    }
}