import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { taskRepository } from "../../repositories/TaskRepository";

export const deleteById = async (req: Request,res: Response) => {
   try {
        await taskRepository.delete(req.params.id)
        return res.status(StatusCodes.OK).send()
   } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao deletetar tarefa!'
            }
        })
   }
}
