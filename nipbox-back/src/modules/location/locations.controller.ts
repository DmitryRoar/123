import { Controller, Get, Param } from '@nestjs/common';
import LocationService from './location.service';

@Controller('location')
export default class LocationController {
	constructor(private locService: LocationService) {}

	@Get('sdek/:location/cc/:cc')
	async getSdekLocation(@Param('location') location: string, @Param('cc') cc: string) {
		return this.locService.findSdekLocations(location, cc);
	}
	@Get('dadata/:location')
	async getLocation(@Param('location') location: string) {
		return this.locService.getAdressHint(location);
	}
}
