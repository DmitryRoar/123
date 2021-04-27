import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Review extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: string;

    @Column()
    avatarLink: string;

    @Column()
    text: string;

    @Column()
    name: string;

    @Column()
    link: string;
}