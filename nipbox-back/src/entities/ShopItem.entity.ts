import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CartItemEntity from './CartItem.entity';

@Entity()
export default class ShopItemEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: string;

	@Column()
	name: string;

	@Column()
	desc: string;

	@Column({ default: '' })
	seoDesc: string;

	@Column({ default: '' })
	seoTags: string;

	@Column()
	amountDesc: string;

	@Column()
	order: number;

	@Column()
	price: number;

	@Column({ default: false })
	hidden: boolean;

	@Column({ default: '' })
	mini: string;

	@Column()
	weight: number;

	@Column({ type: 'json' })
	media: IShopItemMedia = {
		closed: '',
		imgs: [],
		opened: '',
	};

	@OneToMany(() => CartItemEntity, (ci) => ci.item)
	cartItems: CartItemEntity[];

	@Column({ default: 10 })
	height: number;

	@Column({ default: 25 })
	length: number;

	@Column({ default: 17 })
	width: number;
}

export interface IShopItemMedia {
	imgs: string[];
	opened: string;
	closed: string;
}
