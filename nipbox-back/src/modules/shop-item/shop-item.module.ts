import { Module } from "@nestjs/common";
import AuthService from "../auth/auth.service";
import FileService from "../file/file.service";
import ShopItemController from "./shop-item.controller";
import ShopItemService from "./shop-item.service";

@Module({
    controllers: [ShopItemController],
    providers: [ShopItemService, FileService, AuthService]
})
export default class ShopItemModule {}