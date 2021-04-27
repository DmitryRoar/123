import ShopItemEntity from '../../entities/ShopItem.entity';
export default class DeliveryService {
    private url;
    private token;
    private getConfig;
    private getToken;
    getDeliveryPriceByCart(toZip: string, itemsToDeliver: {
        id: string;
        amount: number;
    }[], type: 'rf' | 'sdek' | 'bxb', cu: 'Россия' | 'Беларусь' | 'Казахстан'): Promise<{
        type: string;
        price: number;
        period: string;
    } | {
        type: string;
        err: string;
        price?: undefined;
        period?: undefined;
    }>;
    private getBxbDeliveryPrice;
    private getCartPrice;
    loadCities(): Promise<boolean>;
    private getSdekDeliveryPrice;
    deliveryPostRf(to: string, items: {
        item: ShopItemEntity;
        amount: number;
    }[], fromLoc: string): Promise<{
        err: string;
        price?: undefined;
        period?: undefined;
    } | {
        price: number;
        period: string;
        err?: undefined;
    }>;
    private postSdek;
}
