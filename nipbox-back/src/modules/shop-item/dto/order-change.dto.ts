import { IsArray, IsNotEmpty, IsNumber, IsNumberString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export default class OrderChangeDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Product)
	products: Product[];
}

class Product {
	@IsNotEmpty()
	@IsNumberString()
	id: string;

	@IsNotEmpty()
	@IsNumber()
	order: number;
}
