import { Module } from '@nestjs/common';
import AuthService from '../auth/auth.service';
import SeoConfigController from './seo-config.controller';
import SeoConfigService from './seo-config.service';

@Module({
	controllers: [SeoConfigController],
	providers: [SeoConfigService, AuthService],
})
export default class SeoConfigModule {}
