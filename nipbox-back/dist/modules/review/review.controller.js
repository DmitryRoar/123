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
const create_review_dto_1 = require("./dto/create-review.dto");
const edit_review_dto_1 = require("./dto/edit-review.dto");
const remove_review_dto_1 = require("./dto/remove-review.dto");
const review_service_1 = require("./review.service");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async findOne(id) {
        return this.reviewService.getReview(id);
    }
    async findAll() {
        return this.reviewService.getReviews();
    }
    async create(dto) {
        return this.reviewService.createReview(dto);
    }
    async remove(dto) {
        return this.reviewService.removeReview(dto);
    }
    async edit(dto) {
        return this.reviewService.editReview(dto);
    }
};
__decorate([
    common_1.Get('/one/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findOne", null);
__decorate([
    common_1.Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.default]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('remove'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_review_dto_1.default]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "remove", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('edit'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_review_dto_1.default]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "edit", null);
ReviewController = __decorate([
    common_1.Controller('review'),
    __metadata("design:paramtypes", [review_service_1.default])
], ReviewController);
exports.default = ReviewController;
//# sourceMappingURL=review.controller.js.map