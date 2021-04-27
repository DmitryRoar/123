import { Module } from "@nestjs/common";
import AuthService from "../auth/auth.service";
import PagesController from "./pages.controller";
import PagesService from "./pages.service";

@Module({
    controllers: [PagesController],
    providers: [PagesService, AuthService]
})
export default class PageModule {}