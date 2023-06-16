import { User } from "../../entities"; 
import { validation } from "../../shared/middlewares";
import * as yup  from 'yup'

interface IBodyProps extends Omit<User,'firstName'| 'id' | 'lastName' | 'createdAt' | 'updatedAt' | 'tasks'> {}

export const bodyLogin = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    }))
}))