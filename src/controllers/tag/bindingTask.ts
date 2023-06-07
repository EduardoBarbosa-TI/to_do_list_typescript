import { Request, Response } from "express";
import { Tag, Task } from "../../entidades";
import { AppDataSource } from "../../database/data-source";
import { StatusCodes } from "http-status-codes";

export const bindingTask = async (req: Request, res:Response) => {
    const { title } = req.body
    const tag =  new Tag(title)
    await tag.save()
    try {
        const task = await AppDataSource.manager.findOne(Task, { where: { id: req.params.id }, relations: ['tags'] })
        if(!task){throw new Error('Id inválido!')}

        task.tags.push(tag)
        await task.save()

        return res.status(StatusCodes.CREATED).json({
            message: 'Tag adicionada com sucesso e vinculada com a task!, idTask: ' + task.id
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: 'Erro ao adicionar a tag e vincular com a task'
            }
        })
    }
}