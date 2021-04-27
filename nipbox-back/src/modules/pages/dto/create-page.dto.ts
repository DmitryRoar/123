import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { TextContent } from '../../../entities/Page.entity';

export default class CreatePageDto {
	@IsNotEmpty()
	@ValidateNested({
		each: true,
	})
	textContent: TextContent;

	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsString()
	url: string;

	@IsNotEmpty()
	@IsString()
	category: string;

	@IsNotEmpty()
	@IsString()
	seoDesc: string;

	@IsNotEmpty()
	@IsString()
	seoTags: string;
}
