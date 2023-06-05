import { Request, Response } from "express"
import { AppDataSource } from "../../database/data-source"
import { Tag } from "../../entidades"
import { StatusCodes } from "http-status-codes"

export const getAll = async (req: Request, res: Response) => {
    try {
        const tag = await AppDataSource.manager.find(Tag)
        return res.status(StatusCodes.OK).json({
            tag: tag
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            erros: {
                default: 'Erro ao listar tags!'
            }
        })
    }
}