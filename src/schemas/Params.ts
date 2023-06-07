import { validation } from "../shared/middlewares"
import * as yup from 'yup'

export interface IProps {
    id?: string
}

export const params = validation(getSchema => ({
    params: getSchema<IProps>(yup.object().shape({
        id: yup.string().required()
    }))
}))