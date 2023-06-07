import * as create from './Create'
import * as getAll from './GetAll'
import * as bidingTag from './bindingTask'
import * as getById from './GetById'
import * as updateById from './UpdateById'
import * as deleteById from './DeleteById'


export const TagController = {
    ...create,
    ...bidingTag,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById,
}