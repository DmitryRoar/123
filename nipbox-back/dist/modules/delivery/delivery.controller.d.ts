import DeliveryService from './delivery.service';
export default class DeliveryController {
    private deiliveryService;
    constructor(deiliveryService: DeliveryService);
    getPrice(body: any): Promise<{
        type: string;
        price: number;
        period: string;
    } | {
        type: string;
        err: string;
        price?: undefined;
        period?: undefined;
    }>;
}
