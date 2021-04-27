import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import DeliveryService from './delivery.service';

@Controller('delivery')
export default class DeliveryController {
	constructor(private deiliveryService: DeliveryService) {}

	@Post('/to/')
	async getPrice(@Body() body) {
		return this.deiliveryService.getDeliveryPriceByCart(body.to, body.items, body.type, body.cu);
	}

	// @Get('load')
	// async load() {
	// 	return this.deiliveryService.loadCities();
	// }
}
