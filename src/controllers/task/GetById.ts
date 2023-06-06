import { Request, Response } from "express"
import { AppDataSource } from "../../database/data-source"
import { Task } from "../../entidades"
import { StatusCodes } from "http-status-codes"

export const getById = async (req: Request,res: Response) => {
    try {
        const task = await AppDataSource.manager.findOne(Task,{ where: { id: req.params.id }, relations: ['user','tags'] })
        return res.status(StatusCodes.OK).json({
            task: task
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({   
            error: {
                default: 'Erro ao listar tarefa!'
            }
        })
    }
}