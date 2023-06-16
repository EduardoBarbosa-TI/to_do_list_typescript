import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { taskRepository } from "../../repositories/TaskRepository"

export const updateById  = async (req: Request,res: Response) => {
    try {
        await taskRepository.update(req.params.id,req.body)

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

