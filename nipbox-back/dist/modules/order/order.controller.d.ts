import { Response } from 'express';
import OrderCreateDto from './dto/order-create.dto';
import OrderService from './order.service';
export default class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    verify(req: any, res: Response): Promise<void>;
    createOrder(dto: OrderCreateDto): Promise<any>;
    getAll(): Promise<import("../../entities/Purchase.entity").default[]>;
    sendTracks(body: any): Promise<boolean>;
    getById(id: string): Promise<import("../../entities/Purchase.entity").default>;
    verifyAdm(id: string, req: any): Promise<true | "wrong event">;
    setStatus(status: string, id: string): Promise<boolean>;
}
