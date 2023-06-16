import { Task } from "../../entities" 
import { validation } from "../../shared/middlewares"
import * as yup from 'yup'

export interface IBodyProps extends Omit<Task,'id' | 'createdAt' | 'updatedAt' | 'tags' | 'user'>{}

export const bodyCreate = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required()
    }))
}))

