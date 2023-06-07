import { validation } from "../../shared/middlewares"
import * as yup  from 'yup'

export interface IQueryProps{
    id?: string;
    tag?: string;
    order?: string;
    filter?: string;
}

export const queryFilter = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
      tag: yup.string().optional(),
      order: yup.string().optional(),
      id: yup.string().optional(),
      filter: yup.string().optional(),
    }))
  }))
