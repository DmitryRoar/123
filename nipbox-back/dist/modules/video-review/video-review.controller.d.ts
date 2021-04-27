import CreateVideoReviewDto from './dto/create-video-review.dto';
import EditVideoReview from './dto/edit-video-review.dto';
import VideoReviewService from './video-review.service';
export default class VideoReviewController {
    private videoReviewService;
    constructor(videoReviewService: VideoReviewService);
    create(data: CreateVideoReviewDto, file: any): Promise<void>;
    remove(id: string): Promise<boolean>;
    edit(data: EditVideoReview, file: any): Promise<void>;
    getAll(): Promise<import("../../entities/VideoReview.entity").default[]>;
    getById(id: string): Promise<import("../../entities/VideoReview.entity").default>;
}
