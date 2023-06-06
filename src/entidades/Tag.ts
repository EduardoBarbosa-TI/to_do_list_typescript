import { BaseEntity, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ITag } from "../models/Tag";
import { Task } from "./Task";

@Entity()
export class Tag extends BaseEntity implements ITag{
    @PrimaryGeneratedColumn('uuid')
    id!: string
    
    @Column()
    titulo!: string

    @CreateDateColumn()
    createdAt!: Date

    @BeforeUpdate()
    @UpdateDateColumn({ nullable: true})
    updatedAt!: Date;

    @ManyToMany(() => Task, (task) => task.tags)
    tasks!: Task[]
}