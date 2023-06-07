import { BaseEntity, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ITag } from "../models/Tag";
import { Task } from "./Task";
@Entity()
export class Tag extends BaseEntity implements ITag{
    @PrimaryGeneratedColumn('uuid')
    id!: string
    
    @Column()
    title!: string

    @CreateDateColumn()
    createdAt!: Date

    @BeforeUpdate()
    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToMany(() => Task, (task) => task.tags)
    tasks!: Task[]

    constructor(title: string){
        super()
        this.title = title
    }
}