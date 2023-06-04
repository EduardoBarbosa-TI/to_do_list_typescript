import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ITask } from "../models";
import { User } from "./User";


@Entity()
export class Task extends BaseEntity implements ITask {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    titulo!: string

    @Column()
    descricao!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @ManyToOne(() => User, (user) => user.tasks)
    user!: User

    // @ManyToMany(() => Tag)
    // @JoinTable()
    // Tags!: Tag[]
}