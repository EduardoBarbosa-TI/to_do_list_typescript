import { IUser } from "../../models";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup'

interface IBodyProps extends Omit<IUser, 'id'> {}

export const bodyRegister = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        firstName: yup.string().required().min(3).max(150),
        lastName: yup.string().optional().min(3).max(150),
        email: yup.string().email().required(),
        password: yup.string().required()
    }))
}))