import * as create from './Create'
import * as getAll from './GetAll'
import * as bindingTag from './bindingTag'
import * as getById from './GetById'
import * as updateById from './UpdateById'
import * as deleteById from './DeleteById'

export const TaskController = {
    ...create,
    ...bindingTag,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
}