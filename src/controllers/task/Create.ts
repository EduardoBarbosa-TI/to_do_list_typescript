import { Request, Response } from "express"
import {Task, User } from "../../entidades"
import { AppDataSource } from "../../database/data-source"
import { StatusCodes } from "http-status-codes"


export const create = async (req: Request,res: Response) => {
    const {title, description} = req.body
    const task =  new Task(title,description,[])   
    const id = String(req.headers['id-access-token']) 
    
    try {
        const user = await AppDataSource.manager.findOne(User, { where: { id: id} })

        if(!user){
            throw new Error('Usuário não encontrado!')
        }

        task.user = user 
        await task.save()

        return res.status(StatusCodes.CREATED).json({
            message: 'Tarefa adicionada com sucesso!, id: ' + task.id
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: {
                default: 'Erro ao cadastrar tarefa!'
            }
        })
    }
}