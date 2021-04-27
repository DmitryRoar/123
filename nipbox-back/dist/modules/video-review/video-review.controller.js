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
const create_video_review_dto_1 = require("./dto/create-video-review.dto");
const edit_video_review_dto_1 = require("./dto/edit-video-review.dto");
const video_review_service_1 = require("./video-review.service");
let VideoReviewController = class VideoReviewController {
    constructor(videoReviewService) {
        this.videoReviewService = videoReviewService;
    }
    async create(data, file) {
        return this.videoReviewService.create(data, file);
    }
    async remove(id) {
        return this.videoReviewService.remove(id);
    }
    async edit(data, file) {
        return this.videoReviewService.edit(data, file);
    }
    async getAll() {
        return this.videoReviewService.getAll();
    }
    async getById(id) {
        return this.videoReviewService.getById(id);
    }
};
__decorate([
    common_1.Post('create'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_video_review_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], VideoReviewController.prototype, "create", null);
__decorate([
    common_1.Post('/remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoReviewController.prototype, "remove", null);
__decorate([
    common_1.Post('/edit'),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_video_review_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], VideoReviewController.prototype, "edit", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VideoReviewController.prototype, "getAll", null);
__decorate([
    common_1.Get('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VideoReviewController.prototype, "getById", null);
VideoReviewController = __decorate([
    common_1.Controller('video'),
    __metadata("design:paramtypes", [video_review_service_1.default])
], VideoReviewController);
exports.default = VideoReviewController;
//# sourceMappingURL=video-review.controller.js.map