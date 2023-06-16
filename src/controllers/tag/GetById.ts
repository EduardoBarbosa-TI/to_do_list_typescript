import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { tagRepository } from "../../repositories/TagRepository"

export const getbyId = async (req: Request, res: Response) => {
    try {
        const tag = await tagRepository.findOne({where: {id: req.params.id}, relations: ['tasks'] })
        return res.status(StatusCodes.OK).json({ tag })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Erro ao listar tags!'
            }
        })
    }
}