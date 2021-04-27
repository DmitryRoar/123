import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import PurchaseEntity from './Purchase.entity';
import ShopItemEntity from './ShopItem.entity';

@Entity()
export default class CartItemEntity extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	id: string;

	@ManyToOne(() => ShopItemEntity, (s) => s.cartItems, { eager: true })
	item: ShopItemEntity;

	@ManyToOne(() => PurchaseEntity, (p) => p.items)
    purchase: PurchaseEntity;

    @Column()
    amount: number;
}
