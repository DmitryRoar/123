import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreatePromocodeDto {
	@IsNotEmpty()
	@IsString()
	name: string;
    
	@IsNotEmpty()
	@IsNumber()
	precentage: number;
}
