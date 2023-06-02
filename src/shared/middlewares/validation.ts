import  { RequestHandler} from 'express'
import  { ObjectSchema, ValidationError, Maybe, AnyObject} from 'yup'
import { StatusCodes } from 'http-status-codes'


type TProperty = 'body' | 'header' | 'params' 

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>

type TAllSchemas =  Record<TProperty, ObjectSchema<any>>

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler

export const validation: TValidation = (getAllSchemas) => async (req,res,next) => {


  const schemas = getAllSchemas((schema) => schema)
 
  const errorsResult: Record<string,Record<string, string>>= {}
  const bodySchema = new ObjectSchema(req.body).fields
  const errors: Record<string, string> = {};
  let fieldExists = false;
 
  Object.entries(schemas).forEach(([key, schema]) => {
    try{
      schema.validateSync(req[key as TProperty], { abortEarly: false, strict: true }) 
    } catch(err) {
      const yupError = err as ValidationError
      yupError.inner.forEach(error => {
      
      for (const keybodySchema in bodySchema) {
        if (Object.prototype.hasOwnProperty.call(bodySchema, keybodySchema)) {
          const element = keybodySchema;
           
          if(!schemas.body?.fields[element]){
           
            errors[element] = 'Campo Inexistente'
          }
        }
      }
        
        if(!error.path) return
        errors[error.path] = error.message
        
      })
      
      errorsResult[key] = errors
    }
  }) 

 


  if (Object.entries(errorsResult).length === 0) {
      return next()
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult })
    }
}