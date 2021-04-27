import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateVideoReviewDto {
	@IsNotEmpty()
	@IsString()
	videoLink: string;

	@IsNotEmpty()
	@IsString()
	text: string;
}
