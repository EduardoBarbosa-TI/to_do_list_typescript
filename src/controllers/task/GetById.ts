import { Request, Response } from "express"
import { AppDataSource } from "../../connection/data-source"
import { Task } from "../../entidades"
import { StatusCodes } from "http-status-codes"
import { taskRepository } from "../../repositories/TaskRepository"

export const getById = async (req: Request,res: Response) => {
    try {
        const task = await taskRepository.findOne({ where: { id: req.params.id }, relations: ['user','tags'] })
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