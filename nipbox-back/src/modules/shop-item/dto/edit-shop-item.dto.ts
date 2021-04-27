import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import CreateShopItemDto from './create-shop-item.dto';

export default class EditShopItemDto extends PartialType(CreateShopItemDto) {
	@IsNotEmpty()
	@IsString()
	id: string;
}
