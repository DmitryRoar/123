import LocationService from './location.service';
export default class LocationController {
    private locService;
    constructor(locService: LocationService);
    getSdekLocation(location: string, cc: string): Promise<import("../../entities/Location.entity").default[]>;
    getLocation(location: string): Promise<{
        value: string;
        index: string;
        house: string;
        city: string;
    }[]>;
}
