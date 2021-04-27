import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export default class BlogEntity extends BaseEntity {
	@PrimaryGeneratedColumn({type: 'bigint'})
	id: string;

	@Column()
	desc: string;

	@Column({nullable: true})
	img: string;

  @Column()
	text: string;

  @Column({nullable: true})
	url: string;


  @Column({nullable: true})
  groupId: string;

  @Column({nullable: true})
  isChildren: boolean;


  @Column({nullable: true})
  order: string;
}
