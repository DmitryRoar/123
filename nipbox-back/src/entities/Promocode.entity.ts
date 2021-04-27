import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Promocode extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: string;

    @Column()
    codeName: string;

    @Column()
    precentage: number;
}