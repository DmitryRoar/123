import { Module } from '@nestjs/common';
import AuthService from '../auth/auth.service';
import ReviewController from './review.controller';
import ReviewService from './review.service';

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, AuthService],
})
export default class ReviewModule {}
