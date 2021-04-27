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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
let LocationController = class LocationController {
    constructor(locService) {
        this.locService = locService;
    }
    async getSdekLocation(location, cc) {
        return this.locService.findSdekLocations(location, cc);
    }
    async getLocation(location) {
        return this.locService.getAdressHint(location);
    }
};
__decorate([
    common_1.Get('sdek/:location/cc/:cc'),
    __param(0, common_1.Param('location')), __param(1, common_1.Param('cc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getSdekLocation", null);
__decorate([
    common_1.Get('dadata/:location'),
    __param(0, common_1.Param('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationController.prototype, "getLocation", null);
LocationController = __decorate([
    common_1.Controller('location'),
    __metadata("design:paramtypes", [location_service_1.default])
], LocationController);
exports.default = LocationController;
//# sourceMappingURL=locations.controller.js.map