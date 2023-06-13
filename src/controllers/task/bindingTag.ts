import { Request, Response } from "express";
import {Task} from "../../entidades";

import { StatusCodes } from "http-status-codes";
import { tagRepository } from "../../repositories/TagRepository";
import { userRepository } from "../../repositories/UserRepository";
import { taskRepository } from "../../repositories/TaskRepository";

export const bindingTag = async (req: Request, res:Response) => {
    const {title, description} = req.body
    const task =  new Task(title,description,[])  
    const id = String(req.headers['id-access-token'])
    
    try {
        const tag = await tagRepository.findOne({ where: { id: req.params.id }})
        const user = await userRepository.findOne({ where: { id: id} })

        if(!user){ throw new Error('Usuário não encontrado!')
        }else if(!tag){ throw new Error('Id inválido!') }

        task.tags.push(tag)
        task.user = user 

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

