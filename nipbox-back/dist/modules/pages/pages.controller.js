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
const create_page_dto_1 = require("./dto/create-page.dto");
const edit_page_dto_1 = require("./dto/edit-page.dto");
const pages_service_1 = require("./pages.service");
let PagesController = class PagesController {
    constructor(pageService) {
        this.pageService = pageService;
    }
    async getCategories() {
        return await this.pageService.getCategories();
    }
    async edit(dto) {
        return await this.pageService.edit(dto);
    }
    async create(dto) {
        return await this.pageService.create(dto);
    }
    async remove(id) {
        return await this.pageService.remove(id);
    }
    async getAll() {
        return await this.pageService.find();
    }
    async getByUrl(url) {
        return await this.pageService.getByUrl(url);
    }
};
__decorate([
    common_1.Get('/categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getCategories", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('edit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_page_dto_1.default]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "edit", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_page_dto_1.default]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "create", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "remove", null);
__decorate([
    common_1.Get(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getAll", null);
__decorate([
    common_1.Get('/url/:url'),
    __param(0, common_1.Param('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getByUrl", null);
PagesController = __decorate([
    common_1.Controller('pages'),
    __metadata("design:paramtypes", [pages_service_1.default])
], PagesController);
exports.default = PagesController;
//# sourceMappingURL=pages.controller.js.map