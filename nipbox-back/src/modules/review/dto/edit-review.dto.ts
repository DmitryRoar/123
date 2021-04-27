import { IsNotEmpty, IsString } from 'class-validator';

export default class EditReviewDto {
	@IsNotEmpty()
	id: string;

	@IsNotEmpty()
	@IsString()
	avatarLink: string;

	@IsString()
	@IsNotEmpty()
	text: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	link: string;
}
