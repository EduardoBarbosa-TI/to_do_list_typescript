import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Tag } from "../../entidades";
import { StatusCodes } from "http-status-codes";

export const updateById = async (req: Request,res: Response) => {
    const { title } = req.body
    try {
        await AppDataSource.manager.update(Tag,req.params.id,{title: title})
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