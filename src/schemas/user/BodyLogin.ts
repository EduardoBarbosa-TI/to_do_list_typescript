import { IUser } from "../../models";
import { validation } from "../../shared/middlewares";
import * as yup  from 'yup'


interface IBodyProps extends Omit<IUser,'firstName'| 'id' | 'lastName'> {}

export const bodyLogin = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    }))
}))