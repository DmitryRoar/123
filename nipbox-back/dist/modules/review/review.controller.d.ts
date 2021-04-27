import CreateReviewDto from './dto/create-review.dto';
import EditReviewDto from './dto/edit-review.dto';
import RemoveReviewDto from './dto/remove-review.dto';
import ReviewService from './review.service';
export default class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
    findOne(id: string): Promise<import("../../entities/Review.entity").default>;
    findAll(): Promise<import("../../entities/Review.entity").default[]>;
    create(dto: CreateReviewDto): Promise<boolean>;
    remove(dto: RemoveReviewDto): Promise<{
        success: boolean;
        err: string;
    }>;
    edit(dto: EditReviewDto): Promise<boolean>;
}
