import Review from '../../entities/Review.entity';
import CreateReviewDto from './dto/create-review.dto';
import RemoveReviewDto from './dto/remove-review.dto';
import EditReviewDto from './dto/edit-review.dto';
export default class ReviewService {
    createReview(data: CreateReviewDto): Promise<boolean>;
    editReview(data: EditReviewDto): Promise<boolean>;
    removeReview(data: RemoveReviewDto): Promise<{
        success: boolean;
        err: string;
    }>;
    getReviews(): Promise<Review[]>;
    getReview(id: string): Promise<Review | null>;
}
