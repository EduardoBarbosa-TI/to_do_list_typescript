import { Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, Column, BaseEntity, BeforeUpdate } from "typeorm"
import { IUser } from "../models"
import bcrypt from 'bcrypt'

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
    updatedAt!: Date | null;
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