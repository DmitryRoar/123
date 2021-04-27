import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../common/guards/auth.guard';
import CreateShopItemDto from './dto/create-shop-item.dto';
import EditShopItemDto from './dto/edit-shop-item.dto';
import OrderChangeDto from './dto/order-change.dto';
import ShopItemService from './shop-item.service';

@Controller('products')
export default class ShopItemController {
	constructor(private shopItemService: ShopItemService) {}
	@UseGuards(AuthGuard)
	@Post('create')
	@UseInterceptors(AnyFilesInterceptor())
	async create(@Body() data: CreateShopItemDto, @UploadedFiles() files) {
		// console.log(files);
		return this.shopItemService.createShopItem(
			data,
			files.find((f) => f.fieldname === 'opened'),
			files.find((f) => f.fieldname === 'closed')
		);
	}

	@UseGuards(AuthGuard)
	@Post('upload-slide')
	@UseInterceptors(FileInterceptor('file'))
	async uploadSlide(@Body() body, @UploadedFile() file) {
		return this.shopItemService.uploadSlide(body.id, file);
	}

	@UseGuards(AuthGuard)
	@Post('move')
	async order(@Body() dto: OrderChangeDto) {
		return this.shopItemService.changeOrder(dto.products);
	}

	@UseGuards(AuthGuard)
	@Post('remove-slide')
	async removeSlide(@Body() body) {
		return this.shopItemService.removeSlide(body.id, body.slideName);
	}

	@UseGuards(AuthGuard)
	@Post('edit')
	@UseInterceptors(AnyFilesInterceptor())
	async edit(@Body() data: EditShopItemDto, @UploadedFiles() files) {
		return this.shopItemService.editShopItem(
			data,
			files.find((f) => f.fieldname === 'opened'),
			files.find((f) => f.fieldname === 'closed')
		);
	}

	@Get('/exclude/:id/take/:amount')
	async excludeAndTake(@Param('id') id: string, @Param('amount') amount: string) {
		return this.shopItemService.excludeAndTake(id , parseInt(amount))
	}

	@UseGuards(AuthGuard)
	@Get('remove/:id')
	async remove(@Param('id') id: string) {
		return this.shopItemService.removeShopItem(id);
	}

	@Get('/id/:id')
	async getOne(@Param('id') id: string) {
		console.log(id);
		return await this.shopItemService.getShopItem(id);
	}

	@Get()
	async getAll() {
		return await this.shopItemService.getShopItems();
	}
}
