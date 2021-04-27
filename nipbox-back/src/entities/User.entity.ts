import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;
}