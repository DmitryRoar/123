import VideoReview from '../../entities/VideoReview.entity';
import FileService from '../file/file.service';
import CreateVideoReviewDto from './dto/create-video-review.dto';
import EditVideoReview from './dto/edit-video-review.dto';
export default class VideoReviewService {
    private fileService;
    constructor(fileService: FileService);
    create(dto: CreateVideoReviewDto, preview: any): Promise<void>;
    remove(id: string): Promise<boolean>;
    edit(dto: EditVideoReview, file: any): Promise<void>;
    getAll(): Promise<VideoReview[]>;
    getById(id: string): Promise<VideoReview>;
}
