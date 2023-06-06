import { Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, Column, BaseEntity, BeforeUpdate, UpdateResult, OneToMany } from "typeorm"
import { IUser } from "../models"
import bcrypt from 'bcrypt'
import { Task } from "./Task";

@Entity()
export class User extends BaseEntity implements IUser {

    constructor(firstname: string, lastName: string, email: string, password: string){
        super();
        this.firstName = firstname
        this.lastName = lastName
        this.email = email
        this.password = password
    }

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    firstName: string

    @Column({ nullable: true })
    lastName?: string

    @Column()
    email: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt!: Date

    @BeforeUpdate()
    @UpdateDateColumn({ nullable: true})
    updatedAt!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[]
    
}

export const comparePassword = (password: string,passwordHash: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash)
}