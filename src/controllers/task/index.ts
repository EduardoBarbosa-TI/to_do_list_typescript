import * as create from './Create'
import * as getAll from './GetAll'
// import * as getById from './GetById'
// import * as updateById from './UpdateById'
// import * as deleteById from './DeleteById'
// import * as authenticate from './Authenticate'

export const TaskController = {
    ...create,
    // ...authenticate,
    ...getAll,
    // ...getById,
    // ...updateById,
    // ...deleteById,
}