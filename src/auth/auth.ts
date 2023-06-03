import jwt from "jsonwebtoken"
import { IUser } from "../models"
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../database/data-source"
import { MoreThanOrEqual } from "typeorm"
import { StatusCodes } from "http-status-codes"
import { User, getUserById } from "../entidades"



export const gerarToken = (user: IUser): String => {
    const decodedToken = {
        id: String(user.id),
        firstName: user.firstName,
        email: user.email
    }

    return jwt.sign(decodedToken,'SECRET',{
        expiresIn: '1d'
    })
}

export const authorizeUserByToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const token = req.query.token || req.headers['x-access-token'];
        
        if(!token) {
            return res.status(401).send({ message: 'Acesso Restrito!' });
        }
        try{
            const userToken = jwt.verify(token as string , 'SECRET') as IUser;
            console.log(userToken)
            const user = await getUserById(userToken.id)
            console.log(user)

            if (!user){
                return res.status(400).send({ message : 'Usuário inexistente!'});
            }

            req.body = user;
            
            return next(); 
        } catch (error) {
                return res.status(401).send({ message: 'Token Inválido' });
        }
}
