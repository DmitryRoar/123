import { Module } from '@nestjs/common';

import BlogService from './blog.service';
import BlogController from './blog.controller'
import AuthService from '../auth/auth.service';
import FileService from '../file/file.service';

@Module({
	providers: [BlogService, AuthService, FileService],
	controllers: [BlogController]
})
export default class BlogModule {}
