import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateVideoReviewDto from './dto/create-video-review.dto';
import EditVideoReview from './dto/edit-video-review.dto';
import VideoReviewService from './video-review.service';

@Controller('video')
export default class VideoReviewController {
	constructor(private videoReviewService: VideoReviewService) {}

	@Post('create')
	@UseInterceptors(FileInterceptor('file'))
	async create(@Body() data: CreateVideoReviewDto, @UploadedFile('file') file) {
		return this.videoReviewService.create(data, file);
	}

	@Post('/remove/:id')
	async remove(@Param('id') id: string) {
		return this.videoReviewService.remove(id);
	}

	@Post('/edit')
	async edit(@Body() data: EditVideoReview, @UploadedFile('file') file) {
		return this.videoReviewService.edit(data, file);
	}

	@Get()
	async getAll() {
		return this.videoReviewService.getAll();
	}

	@Get('/id/:id')
	async getById(@Param('id') id: string) {
		return this.videoReviewService.getById(id);
	}
}
