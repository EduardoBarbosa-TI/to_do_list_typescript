import { BaseEntity, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ITag } from "../models/Tag";

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
}