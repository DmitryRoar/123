import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export default class CreateShopItemDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	desc: string;

	@IsNotEmpty()
	@IsString()
	amountDesc: string;

	@IsNotEmpty()
	@IsString()
	mini: string;

	@IsNotEmpty()
	@IsNumberString()
	price: number;

	@IsNotEmpty()
	@IsNumberString()
	weight: number;

	@IsNotEmpty()
	@IsNumberString()
	length: number;

	@IsNotEmpty()
	@IsNumberString()
	width: number;

	@IsNotEmpty()
	@IsNumberString()
	height: number;

	@IsNotEmpty()
	@IsString()
	seoDesc: string;

	@IsNotEmpty()
	@IsString()
	seoTags: string;
}
