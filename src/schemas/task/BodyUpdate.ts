import { validation } from "../../shared/middlewares";
import * as yup from 'yup'

interface IBodyProps {
    title?: string
    description?: string
}

export const bodyUpdate = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required()
    }))
}))
