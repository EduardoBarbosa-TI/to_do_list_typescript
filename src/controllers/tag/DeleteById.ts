import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Tag } from "../../entidades";
import { StatusCodes } from "http-status-codes";

export const deleteById = async (req: Request, res: Response) => {
    try {
        await AppDataSource.manager.delete(Tag,req.params.id)
        return res.status(StatusCodes.OK).send()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao deletetar tag!'
            }
        }) 
    }
}