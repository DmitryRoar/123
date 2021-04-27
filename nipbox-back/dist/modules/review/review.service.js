"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Review_entity_1 = require("../../entities/Review.entity");
const common_1 = require("@nestjs/common");
let ReviewService = class ReviewService {
    async createReview(data) {
        const review = new Review_entity_1.default();
        review.avatarLink = data.avatarLink;
        review.link = data.link;
        review.name = data.name;
        review.text = data.text;
        await review.save();
        return true;
    }
    async editReview(data) {
        Review_entity_1.default.update({
            id: data.id,
        }, data);
        return true;
    }
    async removeReview(data) {
        await Review_entity_1.default.delete({
            id: data.id,
        });
        return {
            success: true,
            err: '',
        };
    }
    async getReviews() {
        return await Review_entity_1.default.find();
    }
    async getReview(id) {
        return await Review_entity_1.default.findOne({
            where: {
                id: id,
            },
        });
    }
};
ReviewService = __decorate([
    common_1.Injectable()
], ReviewService);
exports.default = ReviewService;
//# sourceMappingURL=review.service.js.map