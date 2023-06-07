import * as bodyCreate from './BodyCreate'
import * as queryFilter from './QueryFilter'
import * as bodyUpdate from './BodyUpdate'
import * as params from '../Params'

export const TaskSchema = {
    ...bodyCreate,
    ...queryFilter,
    ...bodyUpdate,
    ...params,
}