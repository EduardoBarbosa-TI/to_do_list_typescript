import { BaseEntity, Brackets, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ITask } from "../models";
import { User } from "./User";
import { Tag } from "./Tag";
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

    constructor(title: string, description: string,tags: Tag[]){
        super();
        this.title = title
        this.description = description
        this.tags = tags;
    }

    static createWithTask(title: string, description: string, tags: Tag[]): Task {
        return new Task(title, description, tags);
    }
}
