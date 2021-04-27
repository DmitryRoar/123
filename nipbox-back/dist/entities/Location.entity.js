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
exports.CountryCode = void 0;
const typeorm_1 = require("typeorm");
let LocationEntity = class LocationEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", String)
], LocationEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "sdek_id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "full_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "city_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "obl_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "center", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "nal_sum_limit", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "eng_name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', array: true }),
    __metadata("design:type", Array)
], LocationEntity.prototype, "post_code_list", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "eng_full_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "eng_obl_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'int2' }),
    __metadata("design:type", Number)
], LocationEntity.prototype, "country_code", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "country_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "eng_country_name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "full_name_fias", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "fias", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "kladr", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], LocationEntity.prototype, "city_dd", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], LocationEntity.prototype, "pvz_code", void 0);
LocationEntity = __decorate([
    typeorm_1.Entity()
], LocationEntity);
exports.default = LocationEntity;
var CountryCode;
(function (CountryCode) {
    CountryCode[CountryCode["RU"] = 1] = "RU";
    CountryCode[CountryCode["KZ"] = 48] = "KZ";
    CountryCode[CountryCode["BLR"] = 42] = "BLR";
})(CountryCode = exports.CountryCode || (exports.CountryCode = {}));
//# sourceMappingURL=Location.entity.js.map