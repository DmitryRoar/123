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
const common_1 = require("@nestjs/common");
const VideoReview_entity_1 = require("../../entities/VideoReview.entity");
const file_service_1 = require("../file/file.service");
let VideoReviewService = class VideoReviewService {
    constructor(fileService) {
        this.fileService = fileService;
    }
    async create(dto, preview) {
        const video = new VideoReview_entity_1.default();
        console.log(dto);
        video.text = dto.text;
        video.videoLink = dto.videoLink;
        await video.save();
        this.fileService.saveFile(`${video.id}.png`, 'video', preview);
    }
    async remove(id) {
        await VideoReview_entity_1.default.delete({
            id,
        });
        return true;
    }
    async edit(dto, file) {
        await VideoReview_entity_1.default.update({
            id: dto.id,
        }, dto);
        if (file) {
            this.fileService.saveFile(dto.id, 'video', file);
        }
    }
    async getAll() {
        return await VideoReview_entity_1.default.find();
    }
    async getById(id) {
        return await VideoReview_entity_1.default.findOne({
            where: {
                id,
            },
        });
    }
};
VideoReviewService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [file_service_1.default])
], VideoReviewService);
exports.default = VideoReviewService;
//# sourceMappingURL=video-review.service.js.map