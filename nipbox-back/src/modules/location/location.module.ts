import { Module } from '@nestjs/common';
import LocationService from './location.service';
import LocationController from './locations.controller';

@Module({
	providers: [LocationService],
	controllers: [LocationController],
})
export default class LocationModule {}
