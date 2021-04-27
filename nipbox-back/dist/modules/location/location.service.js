"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const fs_1 = require("fs");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const DaLocation_entity_1 = require("../../entities/DaLocation.entity");
const Location_entity_1 = require("../../entities/Location.entity");
let LocationService = class LocationService {
    constructor() {
        this.cache = new Map();
    }
    async findSdekLocations(name, cc) {
        let code = '48';
        if (cc === 'Беларусь')
            code = '42';
        const locations = await Location_entity_1.default.find({
            where: {
                city_name: typeorm_1.ILike(`${name}%`),
                country_code: code,
            },
            take: 10,
        });
        return locations;
    }
    async getAdressHint(text) {
        try {
            if (this.cache.has(text.toLowerCase())) {
                return this.cache.get(text.toLowerCase());
            }
            const key = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../../../post.config.json')).toString()).daDataKey;
            const res = await axios_1.default.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
                query: text,
                count: 20,
                locations: [
                    {
                        country: 'Россия',
                    },
                ],
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Token ' + key,
                },
            });
            const cities = res.data;
            setTimeout(() => {
                DaLocation_entity_1.default.createQueryBuilder()
                    .insert()
                    .values(cities.suggestions.map((s) => {
                    return Object.assign({ value: s.value, unValue: s.unrestricted_value }, s.data);
                }))
                    .onConflict(`("house_fias_id") DO NOTHING`)
                    .execute();
            }, 100);
            const data = cities.suggestions.map((s) => ({
                value: s.value,
                index: s.data.postal_code,
                house: s.data.house,
                city: s.data.city
            }));
            this.cache.set(text.toLowerCase(), data);
            return data;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }
};
LocationService = __decorate([
    common_1.Injectable()
], LocationService);
exports.default = LocationService;
//# sourceMappingURL=location.service.js.map