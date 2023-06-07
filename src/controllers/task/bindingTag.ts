import { Request, Response } from "express";
import { Tag, Task, User } from "../../entidades";
import { AppDataSource } from "../../database/data-source";
import { StatusCodes } from "http-status-codes";

export const bindingTag = async (req: Request, res:Response) => {
    const {title, description} = req.body
    const task =  Task.createWithTask(title,description,[])  
    const id = String(req.headers['id-access-token'])
    
    try {
        const tag = await AppDataSource.manager.findOne(Tag, { where: { id: req.params.id }})
        const user = await AppDataSource.manager.findOne(User, { where: { id: id} })

        if(!user){ throw new Error('Usuário não encontrado!')
        }else if(!tag){ throw new Error('Id inválido!') }

        task.tags.push(tag)
        await task.save()
        
        task.user = user 
        await task.save()

        return res.status(StatusCodes.CREATED).json({
            message: 'Tag adicionada com sucesso e vinculada com a task!, idTask: ' + task.id
        })
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: 'Erro ao adicionar a tag e vincular com a task'
            }
        })
    }
}

