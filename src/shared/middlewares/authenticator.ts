import jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import { User } from "../../entities"
import { userRepository } from "../../repositories/UserRepository"

export const gerarToken = (user: User): String => {
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
            const userToken = jwt.verify(token as string , 'SECRET') as User;
            const user = await  userRepository.find({ where: { id: userToken.id } })

            if (!user){return res.status(400).send({ message : 'Usuário inexistente!'})}
            req.headers['id-access-token'] = userToken.id
            
            return next(); 
        } catch (error) {
                return res.status(401).send({ message: 'Token Inválido' });
        }
}