import { Request } from 'express';
import PurchaseEntity from '../../entities/Purchase.entity';
import DeliveryService from '../delivery/delivery.service';
import OrderCreateDto from './dto/order-create.dto';
export default class OrderService {
    private deliveryService;
    constructor(deliveryService: DeliveryService);
    private url;
    private token;
    findAll(): Promise<PurchaseEntity[]>;
    setStatus(status: string, id: string): Promise<boolean>;
    private getConfig;
    private getToken;
    sendTracks(email: string, tracks: string[]): Promise<boolean>;
    validateOrder(req: Request, id?: string): Promise<true | "wrong event">;
    generatePochtaRfXlses(purchase: PurchaseEntity): Promise<void>;
    generateBxbOrder(purchase: PurchaseEntity): Promise<void>;
    generateSdek(order: PurchaseEntity): Promise<boolean>;
    private postSdek;
    createOrder(dto: OrderCreateDto): Promise<any>;
    getById(id: string): Promise<PurchaseEntity>;
}
