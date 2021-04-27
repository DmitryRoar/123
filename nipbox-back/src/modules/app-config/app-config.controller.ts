import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import AppConfigService from './app-config.service';
import EditAppConfig from './dto/edit-app-config.dto';

@Controller('config')
@UseGuards(AuthGuard)
export default class AppConfigController {
	constructor(private appConfigService: AppConfigService) {}

	@Get()
	getConfig() {
		return this.appConfigService.getConfig();
	}

	@Post()
	editConfig(@Body() dto: EditAppConfig) {
		return this.appConfigService.editConfig(dto);
	}
}
