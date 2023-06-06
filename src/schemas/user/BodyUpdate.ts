import { validation } from "../../shared/middlewares"
import * as yup from 'yup'

export interface IBodyProps {
    firstName?: string
    lastName?: string
    password?: string
    email?: string
}

export const bodyUpdate = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        firstName: yup.string().optional().min(3).max(150),
        lastName: yup.string().optional().min(3).max(150),
        password: yup.string().optional().min(3).max(8),
        email: yup.string().email().optional(),
    }))
}))