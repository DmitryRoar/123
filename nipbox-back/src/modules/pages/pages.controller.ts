import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import CreatePageDto from './dto/create-page.dto';
import EditPageDto from './dto/edit-page.dto';
import PagesService from './pages.service';

@Controller('pages')
export default class PagesController {
	constructor(private pageService: PagesService) {}

	@Get('/categories')
	async getCategories() {
		return await this.pageService.getCategories();
	}

	@UseGuards(AuthGuard)
	@Post('edit')
	async edit(@Body() dto: EditPageDto) {
		return await this.pageService.edit(dto);
	}
    
	@UseGuards(AuthGuard)
	@Post('create')
	async create(@Body() dto: CreatePageDto) {
		return await this.pageService.create(dto);
	}

	@UseGuards(AuthGuard)
	@Get('remove/:id')
	async remove(@Param('id') id: string) {
		return await this.pageService.remove(id);
	}

	@Get('')
	async getAll() {
		return await this.pageService.find();
	}

	@Get('/url/:url')
	async getByUrl(@Param('url') url: string) {
		return await this.pageService.getByUrl(url);
	}
}
