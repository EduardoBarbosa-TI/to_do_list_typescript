import { Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, Column,BeforeUpdate,OneToMany } from "typeorm"
import bcrypt from 'bcrypt'
import { Task } from "./Task";

@Entity('user')
export class User{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    firstName!: string

    @Column({ nullable: true })
    lastName?: string

    @Column()
    email!: string

    @Column()
    password!: string

    @CreateDateColumn()
    createdAt!: Date

    @BeforeUpdate()
    @UpdateDateColumn({ nullable: true})
    updatedAt!: Date;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[]

    constructor(firstName: string, lastName: string, email: string, password: string){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }
    
}

export const comparePassword = (password: string,passwordHash: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash)
}