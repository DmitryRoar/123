import Review from '../../entities/Review.entity';
import CreateReviewDto from './dto/create-review.dto';
import RemoveReviewDto from './dto/remove-review.dto';
import EditReviewDto from './dto/edit-review.dto';
import GetReviewDto from './dto/get-review.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ReviewService {
	async createReview(data: CreateReviewDto): Promise<boolean> {
		const review = new Review();
		review.avatarLink = data.avatarLink;
		review.link = data.link;
		review.name = data.name;
		review.text = data.text;

		await review.save();

		return true;
	}

	async editReview(data: EditReviewDto): Promise<boolean> {
		Review.update(
			{
				id: data.id,
			},
			data
		);

		return true;
	}

	async removeReview(data: RemoveReviewDto): Promise<{ success: boolean; err: string }> {
		await Review.delete({
			id: data.id,
		});

		return {
			success: true,
			err: '',
		};
	}

	async getReviews(): Promise<Review[]> {
		return await Review.find();
	}

	async getReview(id: string): Promise<Review|null> {
		return await Review.findOne({
			where: {
				id: id,
			},
		});
	}
}
