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
const blog_service_1 = require("./blog.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const change_blog_dto_1 = require("./dto/change-blog.dto");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    getAll() {
        return this.blogService.getAll();
    }
    getParent() {
        return this.blogService.getParent();
    }
    getByGroupId(id) {
        return this.blogService.getByGroupdId(id);
    }
    getById(id) {
        return this.blogService.getById(id);
    }
    create(createBlogDto, img) {
        return this.blogService.create(createBlogDto, img);
    }
    remove(id) {
        return this.blogService.remove(id);
    }
    changeBlog(changeBlogDto, img) {
        return this.blogService.change(changeBlogDto, img);
    }
    moveBlog(changeOrderDto) {
        return this.blogService.changeOrder(changeOrderDto);
    }
    move(moveBlogDto) {
        return this.blogService.move(moveBlogDto);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getAll", null);
__decorate([
    common_1.Get('/get-parent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getParent", null);
__decorate([
    common_1.Get('/get-group/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getByGroupId", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getById", null);
__decorate([
    common_1.Post('/create'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('img')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.default, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "create", null);
__decorate([
    common_1.Get('/remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "remove", null);
__decorate([
    common_1.Patch('/change/:id'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('img')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_blog_dto_1.default, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "changeBlog", null);
__decorate([
    common_1.Post('/change-order'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "moveBlog", null);
__decorate([
    common_1.Patch('/move'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "move", null);
BlogController = __decorate([
    common_1.Controller('blog'),
    __metadata("design:paramtypes", [blog_service_1.default])
], BlogController);
exports.default = BlogController;
//# sourceMappingURL=blog.controller.js.map