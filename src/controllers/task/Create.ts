import { Request, Response } from "express"
import { validation } from "../../shared/middlewares"
import { ITask } from "../../models"
import * as yup from 'yup'
import { Task } from "../../entidades"
import { AppDataSource } from "../../database/data-source"
import { StatusCodes } from "http-status-codes"

interface IBodyProps extends Omit<ITask, 'id'>{}

export const createValidation = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        titulo: yup.string().required().max(20),
        descricao: yup.string().required().max(100)
    })) 
}))

export const create = async (req: Request,res: Response) => {
    const {titulo, descricao} = req.body

    const task =  new Task()

    task.titulo = titulo
    task.descricao = descricao
    try {
        await AppDataSource.manager.save(task)
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