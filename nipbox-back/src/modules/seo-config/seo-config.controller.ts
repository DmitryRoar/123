import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/guards/auth.guard";
import { EditSeoConfigDto } from "./dto/edit-seo-config.dto";
import SeoConfigService from "./seo-config.service";

@Controller('seo-config')
export default class SeoConfigController {
    constructor(
        private seoConfigService: SeoConfigService
    ) {}

    @UseGuards(AuthGuard)
    @Post('/')
    async editSeoConfig(@Body() dto: EditSeoConfigDto) {
        return await this.seoConfigService.editConfig(dto);
    }

    @Get('/')
    async getSeoConfig() {
        return await this.seoConfigService.getConfig();
    }
}