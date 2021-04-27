import { Injectable } from '@nestjs/common';
import VideoReview from '../../entities/VideoReview.entity';
import FileService from '../file/file.service';
import CreateVideoReviewDto from './dto/create-video-review.dto';
import EditVideoReview from './dto/edit-video-review.dto';

@Injectable()
export default class VideoReviewService {
	constructor(private fileService: FileService) {}

	async create(dto: CreateVideoReviewDto, preview) {
		const video = new VideoReview();
		console.log(dto)
		video.text = dto.text;
		video.videoLink = dto.videoLink;
		await video.save();

		this.fileService.saveFile(`${video.id}.png`, 'video', preview);
	}

	async remove(id: string) {
		await VideoReview.delete({
			id,
		});

		return true;
	}

	async edit(dto: EditVideoReview, file) {
		await VideoReview.update(
			{
				id: dto.id,
			},
			dto
        );
        
        if (file) {
            this.fileService.saveFile(dto.id, 'video', file);
        }
	}

	async getAll() {
		return await VideoReview.find();
	}

	async getById(id: string) {
		return await VideoReview.findOne({
			where: {
				id,
			},
		});
	}
}
