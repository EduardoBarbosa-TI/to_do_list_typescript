import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    FindManyOptions, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { ITask } from "../models";
import { User } from "./User";
import { Tag } from "./Tag";
import { IQueryProps } from "../schemas/task/QueryFilter";
import { AppDataSource } from "../database/data-source";
@Entity()
export class Task extends BaseEntity implements ITask {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @ManyToOne(() => User, (user) => user.tasks)
    user!: User

    @ManyToMany(() => Tag, (tag) => tag.tasks)
    @JoinTable()
    tags: Tag[]

    constructor(title: string, description: string, tags: Tag[]) {
        super();
        this.title = title
        this.description = description
        this.tags = tags;
    }

    static createWithTask(title: string, description: string, tags: Tag[]): Task {
        return new Task(title, description, tags);
    }

    static async getAllFilter(queryFilter: IQueryProps): Promise<Task[]> {
        const task: FindManyOptions<Task> = { relations: ['user', 'tags'] }

        if (queryFilter.order === 'ASC' || queryFilter.order === 'asc') { task.order = { createdAt: 'ASC' }
        }else if(queryFilter.order === 'DESC' || queryFilter.order === 'desc'){ task.order = { createdAt: 'DESC'}}

        if (queryFilter.tag) { task.where = { tags: { title: queryFilter.tag}}}

        if (queryFilter.title) { task.where = { title: queryFilter.title}}

        if (queryFilter.id) { task.where = { id: queryFilter.id}}

        return AppDataSource.manager.find(Task, task);
    }
}
