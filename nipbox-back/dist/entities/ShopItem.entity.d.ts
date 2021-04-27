import { BaseEntity } from 'typeorm';
import CartItemEntity from './CartItem.entity';
export default class ShopItemEntity extends BaseEntity {
    id: string;
    name: string;
    desc: string;
    seoDesc: string;
    seoTags: string;
    amountDesc: string;
    order: number;
    price: number;
    hidden: boolean;
    mini: string;
    weight: number;
    media: IShopItemMedia;
    cartItems: CartItemEntity[];
    height: number;
    length: number;
    width: number;
}
export interface IShopItemMedia {
    imgs: string[];
    opened: string;
    closed: string;
}
