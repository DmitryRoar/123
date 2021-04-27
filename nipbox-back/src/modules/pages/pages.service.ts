import { Injectable } from '@nestjs/common';
import PageEntity from '../../entities/Page.entity';
import CreatePageDto from './dto/create-page.dto';
import EditPageDto from './dto/edit-page.dto';

@Injectable()
export default class PagesService {
	async create(dto: CreatePageDto) {
		const page = new PageEntity();

		page.category = dto.category;
		page.content = dto.textContent;
		page.url = dto.url;
		page.title = dto.title;
		page.seoDesc = dto?.seoDesc;
		page.seoTags = dto?.seoTags;
		
		await page.save();

		return page;
	}

	async edit(dto: EditPageDto) {
		const page = await PageEntity.findOne({
			where: {
				id: dto.id,
			},
		});

		page.title = dto.title;
		page.url = dto.url;
		page.category = dto.category;
		page.content = dto.textContent;
		page.seoDesc = dto?.seoDesc;
		page.seoTags = dto?.seoTags;
		await page.save();

		return page;
	}

	async find() {
		return await PageEntity.find({
            select: ['url', 'id', 'title', 'category'],
        });
	}

	async remove(id: string) {
		return await PageEntity.delete({
			id: id,
		});
	}

	async getCategories() {
		const categories = ['Боксы', 'Информация', 'Контакты'];

		return categories;
	}

	async getByUrl(url: string) {
		return await PageEntity.findOne({
			where: {
				url: url,
			},
			
		});
	}
}
