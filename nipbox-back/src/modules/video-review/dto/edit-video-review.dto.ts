import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import CreateVideoReviewDto from './create-video-review.dto';

export default class EditVideoReview extends PartialType(CreateVideoReviewDto) {
	@IsNotEmpty()
	@IsString()
	id: string;
}
