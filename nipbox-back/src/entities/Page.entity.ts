import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class TextContent {
	blocks: {
		data: any;
		type: string;
	}[];
	time: number;
	version: string;
}

@Entity()
export default class PageEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: string;

	@Column()
	url: string;

	@Column({ type: 'json' })
	content: TextContent;

    @Column()
    title: string;

	@Column()
	category: string;


	@Column({ default: '' })
	seoDesc: string;

	@Column({ default: '' })
	seoTags: string;
}
