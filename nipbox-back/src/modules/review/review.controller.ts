import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import CreateReviewDto from './dto/create-review.dto';
import EditReviewDto from './dto/edit-review.dto';
import RemoveReviewDto from './dto/remove-review.dto';
import ReviewService from './review.service';

@Controller('review')
export default class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@Get('/one/:id')
	async findOne(@Param('id') id: string) {
		return this.reviewService.getReview(id);
	}

	@Get('/all')
	async findAll() {
		return this.reviewService.getReviews();
	}

	@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.createReview(dto);
	}

	@UseGuards(AuthGuard)
	@Post('remove')
	async remove(@Body() dto: RemoveReviewDto) {
		return this.reviewService.removeReview(dto);
	}

	@UseGuards(AuthGuard)
	@Post('edit')
	async edit(@Body() dto: EditReviewDto) {
		return this.reviewService.editReview(dto);
	}
}
