import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CartItemEntity from './CartItem.entity';

@Entity()
export default class PurchaseEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: string;

	@OneToMany(() => CartItemEntity, (ci) => ci.purchase, { eager: true })
	items: CartItemEntity[];

	@Column({ nullable: true })
	paymentId: string;

	@Column()
	index: string;

	@Column({ nullable: true })
	status: string;

	@Column()
	adress: string;

	@Column()
	name: string;

	@Column()
	phone: string;

	@Column({ default: '' })
	country: string;

	@Column({default: ''})
	city: string;
	
	@Column()
	sum: number;

	@Column()
	email: string;

	@Column()
	deliverySum: number;

	@Column()
	deliveryType: string;

	@Column({ default: '' })
	trafic: string;

	@Column()
	independenceKey: string;

	@Column({ type: 'varchar', nullable: true })
	created_at: Date = new Date();

	@Column({ nullable: true, type: 'boolean' })
	xls: boolean;

	@Column({ nullable: true, type: 'json' })
	bxb: {
		track: string;
		label: string;
		itemName: string;
	}[];

	@Column({ nullable: true, type: 'json' })
	sdek: {
		uuid: string;
		itemName: string;
	}[];

	@Column({nullable: true, type: 'json'})
	promocode: {
		text: string;
		precentage: number;
	};
}
