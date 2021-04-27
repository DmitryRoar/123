"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let DaLocationEntity = class DaLocationEntity extends typeorm_1.BaseEntity {
    constructor(data, value, unValue) {
        super();
        if (value) {
            this.value = value;
        }
        if (unValue) {
            this.unValue = unValue;
        }
        if (data) {
            for (const key of Object.keys(data)) {
                this[key] = data[key];
            }
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "value", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "unValue", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "postal_code", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "country_iso_code", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "federal_district", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "region_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "region_kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "region_iso_code", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "region_with_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "region_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "region_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "region", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "area_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "area_kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "area_with_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "area_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "area_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "area", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_with_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_area", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_district_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_district_kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_district_with_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_district_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_district_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "city_district", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "settlement_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "settlement_kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "settlement_with_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "settlement_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "settlement_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "settlement", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "street_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "street_kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "street_with_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "street_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "street_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "street", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, unique: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "house_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "house_kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "house_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "house_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "house", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "block_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "block", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "flat_fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "flat_type", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "flat_type_full", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "flat", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "flat_area", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "square_meter_price", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "flat_price", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "postal_box", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "fias_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "fias_code", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "fias_level", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "fias_actuality_state", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "kladr_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "geoname_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "capital_marker", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "okato", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "oktmo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "tax_office", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "tax_office_legal", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "timezone", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "geo_lat", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "geo_lon", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "beltway_hit", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "beltway_distance", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "metro", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "qc_geo", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "qc_complete", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "qc_house", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "history_values", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "unparsed_parts", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "source", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], DaLocationEntity.prototype, "qc", void 0);
DaLocationEntity = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object, String, String])
], DaLocationEntity);
exports.default = DaLocationEntity;
//# sourceMappingURL=DaLocation.entity.js.map