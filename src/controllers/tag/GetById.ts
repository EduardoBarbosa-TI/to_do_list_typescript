import { Request, Response } from "express"
import { AppDataSource } from "../../database/data-source"
import { Tag } from "../../entidades"
import { StatusCodes } from "http-status-codes"

export const getbyId = async (req: Request, res: Response) => {
    try {
        const tag = await AppDataSource.manager.findOne(Tag, {where: {id: req.params.id}, relations: ['tasks'] })
        return res.status(StatusCodes.OK).json({
            tag: tag
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Erro ao listar tags!'
            }
        })
    }
}