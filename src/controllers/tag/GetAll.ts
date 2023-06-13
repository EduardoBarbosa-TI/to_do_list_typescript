import { Request, Response } from "express"
import { AppDataSource } from "../../connection/data-source"
import { Tag } from "../../entidades"
import { StatusCodes } from "http-status-codes"
import { tagRepository } from "../../repositories/TagRepository"

export const getAll = async (req: Request, res: Response) => {
    try {
        const tag = await tagRepository.find({ relations: ['tasks'] })
        return res.status(StatusCodes.OK).json({ tag })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Erro ao listar tags!'
            }
        })
    }
}