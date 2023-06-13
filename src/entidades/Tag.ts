import { BeforeUpdate, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Task } from "./Task";
@Entity()
export class Tag{
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
      
        this.title = title
    }
}