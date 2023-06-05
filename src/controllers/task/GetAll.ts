import { Request, Response } from "express"
import { AppDataSource } from "../../database/data-source"
import { Task } from "../../entidades"
import { StatusCodes } from "http-status-codes"
import { validation } from "../../shared/middlewares";
import * as yup from 'yup'
import { ITag } from "../../models";

// interface IQueryProps{
//     id?: string;
//     tag?: string;
//     order?: string;
//     filter?: string;
// }

// export const getAllValidation = validation((getSchema) => ({
//     query: getSchema<IQueryProps>(yup.object().shape({
//       tag: yup.string().optional(),
//       order: yup.string().optional(),
//       id: yup.string().optional(),
//       filter: yup.string().optional(),
//     }))
//   }))

export const getAll = async (req: Request,res: Response) => {
    try {
        const task = await AppDataSource.manager.find(Task, { relations: ['user','tags'] })
        return res.status(StatusCodes.OK).json({
            task: task
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({   
            error: {
                default: 'Erro ao listar tarefas!'
            }
        })
    }
}