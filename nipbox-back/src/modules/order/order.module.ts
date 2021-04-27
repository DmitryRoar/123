import { Module } from "@nestjs/common";
import AuthService from "../auth/auth.service";
import DeliveryService from "../delivery/delivery.service";
import OrderController from "./order.controller";
import OrderService from "./order.service";

@Module({
    controllers: [OrderController],
    providers: [DeliveryService, OrderService, AuthService]
})
export default class OrderModule {}