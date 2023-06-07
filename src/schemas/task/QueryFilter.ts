import { validation } from "../../shared/middlewares"
import * as yup  from 'yup'

export interface IQueryProps{
    id?: string;
    tag?: string;
    order?: "asc" | "desc";
    filter?: string;
}

export const queryFilter = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
      tag: yup.string().optional(),
      order: yup.mixed<"asc" | "desc">().oneOf(["asc", "desc"]).optional(),
      id: yup.string().optional(),
      filter: yup.string().optional(),
    }))
  }))
