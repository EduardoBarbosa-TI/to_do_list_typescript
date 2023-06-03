import { Request, Response } from "express"
import { User, comparePassword, getUserByEmail} from "../../entidades/User"
import { StatusCodes } from "http-status-codes"
import { gerarToken } from "../../auth/auth"
import * as yup from 'yup'
import { IUser } from "../../models"
import { validation } from "../../shared/middlewares"

interface IBodyPropsAuthenticate extends Omit<IUser,'firstName'| 'id' | 'lastName'> {}

export const authValidation = validation((getSchema) => ({
    body: getSchema<IBodyPropsAuthenticate>(yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    }))
}))

export const authenticate = async (req: Request, res: Response): Promise<Response> => 
{
    const {email, password} = req.body

    try {
        const user = await getUserByEmail(email)

        if(!user){
            return res.status(StatusCodes.NOT_FOUND).send({ message: 'Usuário não encontrado!' })
        }

        const passwordMatche = await comparePassword(password,user.password)

        if(!passwordMatche){
            return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Senha incorreta!' })
        }

        return res.json({
            user: user,
            token: gerarToken(user as IUser)
        })
        
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
            default: error
        }
    })}
}

