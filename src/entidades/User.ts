import { Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, Column, BaseEntity, BeforeUpdate, UpdateResult, OneToMany } from "typeorm"
import { IUser } from "../models"
import bcrypt from 'bcrypt'
import { Task } from "./Task";

@Entity()
export class User extends BaseEntity implements IUser {
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
}

export const updateById =  async(id_d: string, user: IUser): Promise<UpdateResult | null> => {
    const updateResult = await User.createQueryBuilder().update(User).set(user).where("id = :id", { id: id_d }).returning('*').execute();
    return updateResult
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await User.findOne({ where: { email }})
    return user
}

export const getUserById = async (id: string): Promise<User | null> => {
    const user = await User.findOne({ where: { id }})
    return user
}

export const comparePassword = (password: string,passwordHash: string): Promise<boolean> => {
    return bcrypt.compare(password, passwordHash)
}