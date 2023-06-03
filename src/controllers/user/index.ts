import * as create from './Create'
import * as getAll from './GetAll'
import * as authenticate from './Authenticate'

export const UserController = {
    ...create,
    ...authenticate,
    ...getAll
}