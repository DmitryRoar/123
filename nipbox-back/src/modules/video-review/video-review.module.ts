import { Module } from '@nestjs/common';
import FileService from '../file/file.service';
import VideoReviewController from './video-review.controller';
import VideoReviewService from './video-review.service';

@Module({
	controllers: [VideoReviewController],
	providers: [VideoReviewService, FileService],
})
export default class VideoReviewModule {}
