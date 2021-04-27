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
const auth_guard_1 = require("../../common/guards/auth.guard");
const create_promocode_dto_1 = require("./dto/create-promocode.dto");
const promocodes_service_1 = require("./promocodes.service");
let PromocodeController = class PromocodeController {
    constructor(promocodeService) {
        this.promocodeService = promocodeService;
    }
    async findPromocode(name) {
        return await this.promocodeService.findByName(name);
    }
    async all() {
        return await this.promocodeService.all();
    }
    async create(dto) {
        return await this.promocodeService.create(dto.name, dto.precentage);
    }
    async remove(id) {
        return await this.promocodeService.remove(id);
    }
};
__decorate([
    common_1.Get('find/:name'),
    __param(0, common_1.Param('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "findPromocode", null);
__decorate([
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "all", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('/create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promocode_dto_1.default]),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "create", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('/remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PromocodeController.prototype, "remove", null);
PromocodeController = __decorate([
    common_1.Controller('promocode'),
    __metadata("design:paramtypes", [promocodes_service_1.default])
], PromocodeController);
exports.default = PromocodeController;
//# sourceMappingURL=promocode.controller.js.map