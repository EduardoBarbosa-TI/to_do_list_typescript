import { Request, Response } from "express"
import { Task} from "../../entidades"
import { StatusCodes } from "http-status-codes"
import { IQueryProps } from "../../schemas/task/QueryFilter"

export const getAll = async (req: Request<never,never,never,IQueryProps>,res: Response) => {
    try {
        const task = await Task.getAllFilter(req.query)
        return res.status(StatusCodes.OK).json({ task })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({   
            error: {
                default: 'Erro ao listar tarefas!'
            }
        })
    }
}