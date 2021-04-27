import LocationEntity from '../../entities/Location.entity';
export default class LocationService {
    cache: Map<string, {
        value: string;
        index: string;
        house: string;
        city: string;
    }[]>;
    findSdekLocations(name: string, cc: string): Promise<LocationEntity[]>;
    getAdressHint(text: string): Promise<{
        value: string;
        index: string;
        house: string;
        city: string;
    }[]>;
}
