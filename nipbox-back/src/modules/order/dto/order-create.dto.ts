import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export default class OrderCreateDto {
	@IsNotEmpty()
	@ValidateNested({
		each: true,
	})
	items: Item[];

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	adress: string;

	@IsNotEmpty()
	@IsString()
	city: string;

	@IsNotEmpty()
	@IsString()
	country: string;

	@IsNotEmpty()
	@IsString()
	trafic: string;

	@IsNotEmpty()
	@IsString()
	deliveryType: string;

	@IsNotEmpty()
	@IsString()
	zip: string;

	@IsNotEmpty()
	@IsString()
	phone: string;

	@IsString()
	promocode: string;
}

class Item {
	id: string;
	amount: number;
}
