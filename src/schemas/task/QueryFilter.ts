import { validation } from "../../shared/middlewares"
import * as yup  from 'yup'
export interface IQueryProps{
    id?: string
    title?: string
    tag?: string
    order?: "ASC" | "DESC" | 'asc' | 'desc'
    filter?: string
}

export const queryFilter = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
      tag: yup.string().optional(),
      order: yup.mixed<"ASC" | "DESC" | 'asc' | 'desc'>().oneOf(["ASC", "DESC","asc","desc"]).optional(),
      title: yup.string().optional(),
      id: yup.string().optional(),
      filter: yup.string().optional(),
    }))
  }))
