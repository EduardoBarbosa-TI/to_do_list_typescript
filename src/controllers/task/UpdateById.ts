import { Request, Response } from "express"
import { Task } from "../../entidades"
import { AppDataSource } from "../../database/data-source"
import { StatusCodes } from "http-status-codes"

export const updateById  = async (req: Request,res: Response) => {
    const { title , description } = req.body

    try {
        const newTask = new Task(title,description,[])

        await AppDataSource.manager.update(Task,req.params.id,newTask)

        return res.status(StatusCodes.CREATED).json({
            message: 'Tarefa alterada com sucesso!'
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao atualizar tarefa!'
            }
        })
    }
}

