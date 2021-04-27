import { BaseEntity } from 'typeorm';
import CartItemEntity from './CartItem.entity';
export default class PurchaseEntity extends BaseEntity {
    id: string;
    items: CartItemEntity[];
    paymentId: string;
    index: string;
    status: string;
    adress: string;
    name: string;
    phone: string;
    country: string;
    city: string;
    sum: number;
    email: string;
    deliverySum: number;
    deliveryType: string;
    trafic: string;
    independenceKey: string;
    created_at: Date;
    xls: boolean;
    bxb: {
        track: string;
        label: string;
        itemName: string;
    }[];
    sdek: {
        uuid: string;
        itemName: string;
    }[];
    promocode: {
        text: string;
        precentage: number;
    };
}
