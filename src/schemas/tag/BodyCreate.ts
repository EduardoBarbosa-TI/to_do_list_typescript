
import { Tag } from "../../entities";
import { validation } from "../../shared/middlewares";
import * as yup from 'yup'
interface IBodyProps extends Omit<Tag,'id' | 'createdAt' | 'updatedAt' | 'tasks'> {}

export const bodyCreate = validation(getSchema => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        title: yup.string().required().min(5).max(20)
    }))
}))