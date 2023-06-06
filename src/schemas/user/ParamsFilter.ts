import { validation } from "../../shared/middlewares"
import * as yup from 'yup'

export interface IQueryProps {
    id?: string
    page?: number
    limit?: number
    filter?: string
  }
  
  export const paramsFilter = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      id: yup.string().optional(),
      filter: yup.string().optional(),
    }))
  }))