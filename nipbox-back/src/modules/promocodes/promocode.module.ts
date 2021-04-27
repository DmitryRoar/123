import { Module } from "@nestjs/common";
import AuthService from "../auth/auth.service";
import PromocodeController from "./promocode.controller";
import PromocodesService from "./promocodes.service";

@Module({
    controllers: [PromocodeController],
    providers: [AuthService, PromocodesService]
})
export default class PromocodeModule {}