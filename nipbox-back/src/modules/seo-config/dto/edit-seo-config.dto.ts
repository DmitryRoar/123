import { IsNotEmpty, IsString } from 'class-validator';

export class EditSeoConfigDto {
	@IsNotEmpty()
	@IsString()
	seoDesc: string;

	@IsNotEmpty()
	@IsString()
	seoTitle: string;

	@IsNotEmpty()
	@IsString()
	seoTags: string;
}
