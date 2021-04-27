import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../../common/guards/auth.guard';
import OrderCreateDto from './dto/order-create.dto';
import OrderService from './order.service';

@Controller('order')
export default class OrderController {
	constructor(private orderService: OrderService) {}

	@Post('verify')
	async verify(@Req() req, @Res() res: Response) {
		console.log(req.body);
		await this.orderService.validateOrder(req);

		res.status(200).send('ok');
	}

	@Post('create')
	async createOrder(@Body() dto: OrderCreateDto) {
		return await this.orderService.createOrder(dto);
	}

	@UseGuards(AuthGuard)
	@Get('/')
	async getAll() {
		return await this.orderService.findAll();
	}

	@UseGuards(AuthGuard)
	@Post('/send-tracks')
	async sendTracks(@Body() body) {
		this.orderService.sendTracks(body.email, body.tracks);
		return true;
	}

	@UseGuards(AuthGuard)
	@Get('/id/:id')
	async getById(@Param('id') id: string) {
		return await this.orderService.getById(id);
	}

	@UseGuards(AuthGuard)
	@Get('/verify/:id')
	async verifyAdm(@Param('id') id: string, @Req() req) {
		return await this.orderService.validateOrder(req, id);
	}

	@UseGuards(AuthGuard)
	@Get('/status/:id/:status')
	async setStatus(@Param('status') status: string, @Param('id') id: string) {
		return await this.orderService.setStatus(status, id);
	}
}
