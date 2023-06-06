import { Request, Response } from "express";
import { Tag } from "../../entidades";
import { StatusCodes } from "http-status-codes";
 
export const create = async (req: Request,res: Response) => {
    const { title } = req.body  

    try {
        const tag = new Tag(title)
        await tag.save()
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