import { ITask } from "../../models";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup'

export interface IBodyProps extends Omit<ITask,'id'>{}

export const bodyCreate = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required()
    }))
}))

