import * as bodyRegister from './BodyRegister'
import * as bodyLogin from './BodyLogin'
import * as bodyUpdate from './BodyUpdate'
import * as params from '../Params'
import * as paramsFilter from './ParamsFilter'

export const UserSchema = {
    ...bodyRegister,
    ...bodyLogin,
    ...bodyUpdate,
    ...params,
    ...paramsFilter,
}