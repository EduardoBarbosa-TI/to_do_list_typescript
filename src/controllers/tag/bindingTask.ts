import { Request, Response } from "express";
import { Tag} from "../../entities";
import { StatusCodes } from "http-status-codes";
import { tagRepository } from "../../repositories/TagRepository";
import { taskRepository } from "../../repositories/TaskRepository";

export const bindingTask = async (req: Request, res:Response) => {
    const { title } = req.body
    const tag =  new Tag(title)
    await tagRepository.save(tag)
    try {
        const task = await taskRepository.findOne({ where: { id: req.params.id }, relations: ['tags']})
        
        if(!task){throw new Error('Id inválido!')}

        task.tags.push(tag)
        await taskRepository.save(task)

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