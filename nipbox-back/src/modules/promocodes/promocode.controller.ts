import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/guards/auth.guard";
import CreatePromocodeDto from "./dto/create-promocode.dto";
import PromocodesService from "./promocodes.service";

@Controller('promocode')
export default class PromocodeController {
    constructor(
        private promocodeService: PromocodesService
    ) {}
    
    @Get('find/:name')
    async findPromocode(@Param('name') name: string) {
        return await this.promocodeService.findByName(name);
    }

    @Get('all')
    async all() {
        return await this.promocodeService.all();
    }

    @UseGuards(AuthGuard)
    @Post('/create')
    async create(@Body() dto: CreatePromocodeDto) {
        return await this.promocodeService.create(dto.name, dto.precentage);
    }

    @UseGuards(AuthGuard)
    @Post('/remove/:id')
    async remove(@Param('id') id: string) {
        return await this.promocodeService.remove(id);
    }
}