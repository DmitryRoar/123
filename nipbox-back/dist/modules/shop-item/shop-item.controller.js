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
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../../common/guards/auth.guard");
const create_shop_item_dto_1 = require("./dto/create-shop-item.dto");
const edit_shop_item_dto_1 = require("./dto/edit-shop-item.dto");
const order_change_dto_1 = require("./dto/order-change.dto");
const shop_item_service_1 = require("./shop-item.service");
let ShopItemController = class ShopItemController {
    constructor(shopItemService) {
        this.shopItemService = shopItemService;
    }
    async create(data, files) {
        return this.shopItemService.createShopItem(data, files.find((f) => f.fieldname === 'opened'), files.find((f) => f.fieldname === 'closed'));
    }
    async uploadSlide(body, file) {
        return this.shopItemService.uploadSlide(body.id, file);
    }
    async order(dto) {
        return this.shopItemService.changeOrder(dto.products);
    }
    async removeSlide(body) {
        return this.shopItemService.removeSlide(body.id, body.slideName);
    }
    async edit(data, files) {
        return this.shopItemService.editShopItem(data, files.find((f) => f.fieldname === 'opened'), files.find((f) => f.fieldname === 'closed'));
    }
    async excludeAndTake(id, amount) {
        return this.shopItemService.excludeAndTake(id, parseInt(amount));
    }
    async remove(id) {
        return this.shopItemService.removeShopItem(id);
    }
    async getOne(id) {
        console.log(id);
        return await this.shopItemService.getShopItem(id);
    }
    async getAll() {
        return await this.shopItemService.getShopItems();
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('create'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shop_item_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "create", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('upload-slide'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "uploadSlide", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('move'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_change_dto_1.default]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "order", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('remove-slide'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "removeSlide", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('edit'),
    common_1.UseInterceptors(platform_express_1.AnyFilesInterceptor()),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_shop_item_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "edit", null);
__decorate([
    common_1.Get('/exclude/:id/take/:amount'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "excludeAndTake", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "remove", null);
__decorate([
    common_1.Get('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "getOne", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShopItemController.prototype, "getAll", null);
ShopItemController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [shop_item_service_1.default])
], ShopItemController);
exports.default = ShopItemController;
//# sourceMappingURL=shop-item.controller.js.map