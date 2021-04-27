import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { v4 } from 'uuid';
import ShopItemEntity from '../../entities/ShopItem.entity';
import FileService from '../file/file.service';
import CreateShopItemDto from './dto/create-shop-item.dto';
import EditShopItemDto from './dto/edit-shop-item.dto';

@Injectable()
export default class ShopItemService {
	constructor(private fileService: FileService) {}

	async getShopItem(id: string) {
		return await ShopItemEntity.findOne({
			where: {
				id: id,
			},
		});
	}

	async excludeAndTake(id: string, amount: number) {
		const items = await ShopItemEntity.createQueryBuilder()
			.where(`id != ${id}`)
			.orderBy('random()')
			.take(amount)
			.getMany();

		return items;
	}

	async getShopItems() {
		return await ShopItemEntity.find({
			where: {
				hidden: false,
			},
		});
	}

	async uploadSlide(id: string, slide) {
		const item = await ShopItemEntity.findOne({
			where: {
				id: id,
			},
		});

		if (item && slide) {
			const id = v4();
			this.fileService.saveFile(`slide-${id}.png`, 'shopitem-slide', slide);
			item.media.imgs.push(`slide-${id}.png`);
			await item.save();
		}
	}

	async removeSlide(id: string, slideName: string) {
		const item = await ShopItemEntity.findOne({
			where: {
				id: id,
			},
		});

		const index = item.media.imgs.findIndex((s) => s === slideName);

		item.media.imgs.splice(index, 1);

		await item.save();
	}

	async changeOrder(ordered: { order: number; id: string }[]) {
		ordered.forEach((i, index) => {
			ShopItemEntity.update(
				{
					id: i.id,
				},
				{
					order: index,
				}
			);
		});

		return true;
	}

	async createShopItem(dto: CreateShopItemDto, opened, closed) {
		const shopItem = new ShopItemEntity();

		shopItem.amountDesc = dto.amountDesc;
		shopItem.name = dto.name;
		shopItem.desc = dto.desc;
		shopItem.weight = dto.weight;
		shopItem.order = 0;
		shopItem.mini = dto.mini;
		shopItem.height = dto.height;
		shopItem.width = dto.width;
		shopItem.length = dto.length;
		shopItem.seoDesc = dto.seoDesc;
		shopItem.seoTags = dto.seoTags;
		shopItem.price = parseInt(dto.price.toString());
		await shopItem.save();

		if (opened) {
			this.fileService.saveFile(`opened-${shopItem.id}.png`, 'shopitem', opened);
			shopItem.media.opened = `opened-${shopItem.id}.png`;
		}

		if (closed) {
			this.fileService.saveFile(`closed-${shopItem.id}.png`, 'shopitem', closed);
			shopItem.media.closed = `closed-${shopItem.id}.png`;
		}

		shopItem.order = parseInt(shopItem.id);
		await shopItem.save();

		return shopItem;
	}

	async editShopItem(dto: EditShopItemDto, oepend, closed) {
		const item = await ShopItemEntity.findOne({ where: { id: dto.id } });

		item.amountDesc = dto.amountDesc;
		item.desc = dto.desc;
		item.mini = dto.mini;
		item.price = dto.price;
		item.weight = dto.weight;
		item.height = dto.height;
		item.width = dto.width;
		item.length = dto.length;

		console.log(dto.seoDesc)

		item.seoDesc = dto?.seoDesc;
		item.seoTags = dto?.seoTags;

		await item.save();

		if (oepend) {
			this.fileService.saveFile(`opened-${dto.id}.png`, 'shopitem', oepend);
		}

		if (closed) {
			this.fileService.saveFile(`closed-${dto.id}.png`, 'shopitem', closed);
		}

		return true;
	}

	async removeShopItem(id: string) {
		await ShopItemEntity.update({
			id: id,
		}, {
			hidden: true
		});

		return true;
	}
}
