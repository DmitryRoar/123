export default class OrderCreateDto {
    items: Item[];
    name: string;
    email: string;
    adress: string;
    city: string;
    country: string;
    trafic: string;
    deliveryType: string;
    zip: string;
    phone: string;
    promocode: string;
}
declare class Item {
    id: string;
    amount: number;
}
export {};
