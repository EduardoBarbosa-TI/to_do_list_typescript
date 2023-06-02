import { Entity, PrimaryGeneratedColumn,CreateDateColumn, Column, BaseEntity } from "typeorm"
import { IUser } from "../models"

@Entity()
export class User extends BaseEntity implements IUser {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @CreateDateColumn()
    createdAt!: Date
}