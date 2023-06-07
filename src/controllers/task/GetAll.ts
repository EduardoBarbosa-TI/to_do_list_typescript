import { Request, Response } from "express"
import { Task} from "../../entidades"
import { StatusCodes } from "http-status-codes"
import { AppDataSource } from "../../database/data-source"

export const getAll = async (req: Request,res: Response) => {
    try {
        const task = await AppDataSource.manager.find(Task, { relations: ['user','tags'] })
        return res.status(StatusCodes.OK).json({
            task: task
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({   
            error: {
                default: 'Erro ao listar tarefas!'
            }
        })
    }
}