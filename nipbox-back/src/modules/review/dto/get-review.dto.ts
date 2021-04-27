import { IsNotEmpty } from 'class-validator';

export default class GetReviewDto {
	@IsNotEmpty()
	id: string;
}
