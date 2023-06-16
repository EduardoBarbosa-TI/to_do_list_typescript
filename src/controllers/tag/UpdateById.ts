import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { tagRepository } from "../../repositories/TagRepository";

export const updateById = async (req: Request,res: Response) => {
    const { title } = req.body
    try {
        await tagRepository.update(req.params.id,{title: title})
        return res.status(StatusCodes.CREATED).json({
            message: 'Tag alterada com sucesso!' 
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao atualizar tag!'
            }
        })
    }
}