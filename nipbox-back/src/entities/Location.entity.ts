import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class LocationEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: string;

	@Column({ nullable: true })
	sdek_id: string;

	@Column({ nullable: true })
	full_name: string;

	@Column({ nullable: true })
	city_name: string;

	@Column({ nullable: true })
	obl_name: string;

	@Column({ nullable: true })
	center: string;

	@Column({ nullable: true })
	nal_sum_limit: string;

	@Column({ nullable: true })
	eng_name: string;

	@Column({ type: 'varchar', array: true })
	post_code_list: string[];

	@Column({ nullable: true })
	eng_full_name: string;

	@Column({ nullable: true })
	eng_obl_name: string;

	@Column({ nullable: true, type: 'int2' })
	country_code: CountryCode;

	@Column({ nullable: true })
	country_name: string;

	@Column({ nullable: true })
	eng_country_name: string;

	@Column({ nullable: true })
	full_name_fias: string;

	@Column({ nullable: true })
	fias: string;

	@Column({ nullable: true })
	kladr: string;

	@Column({ nullable: true })
	city_dd: number;

	@Column({ nullable: true })
	pvz_code: string;
}

export enum CountryCode {
	RU = 1,
	KZ = 48,
	BLR = 42,
}
