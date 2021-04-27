import { BaseEntity } from 'typeorm';
import PurchaseEntity from './Purchase.entity';
import ShopItemEntity from './ShopItem.entity';
export default class CartItemEntity extends BaseEntity {
    id: string;
    item: ShopItemEntity;
    purchase: PurchaseEntity;
    amount: number;
}
