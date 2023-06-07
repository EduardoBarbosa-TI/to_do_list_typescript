import * as bodyCreate from './BodyCreate'
import * as bodyUpdate from './BodyUpdate'
import * as params from '../Params'

export const TagSchema = {
    ...bodyCreate,
    ...bodyUpdate,
    ...params,
}