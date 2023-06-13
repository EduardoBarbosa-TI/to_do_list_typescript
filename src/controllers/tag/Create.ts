import { Request, Response } from "express";
import { Tag } from "../../entidades";
import { StatusCodes } from "http-status-codes";
import { tagRepository } from "../../repositories/TagRepository";
 
export const create = async (req: Request,res: Response) => {
    const { title } = req.body  
    const tag = new Tag(title)

    try {
        await tagRepository.save(tag)
        return res.status(StatusCodes.CREATED).json({
            message: 'Tag adicionado com sucesso!, ' + tag.id
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao cadastrar tag!'
            }
        })
    }
}