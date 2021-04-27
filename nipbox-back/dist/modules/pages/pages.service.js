"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Page_entity_1 = require("../../entities/Page.entity");
let PagesService = class PagesService {
    async create(dto) {
        const page = new Page_entity_1.default();
        page.category = dto.category;
        page.content = dto.textContent;
        page.url = dto.url;
        page.title = dto.title;
        page.seoDesc = dto === null || dto === void 0 ? void 0 : dto.seoDesc;
        page.seoTags = dto === null || dto === void 0 ? void 0 : dto.seoTags;
        await page.save();
        return page;
    }
    async edit(dto) {
        const page = await Page_entity_1.default.findOne({
            where: {
                id: dto.id,
            },
        });
        page.title = dto.title;
        page.url = dto.url;
        page.category = dto.category;
        page.content = dto.textContent;
        page.seoDesc = dto === null || dto === void 0 ? void 0 : dto.seoDesc;
        page.seoTags = dto === null || dto === void 0 ? void 0 : dto.seoTags;
        await page.save();
        return page;
    }
    async find() {
        return await Page_entity_1.default.find({
            select: ['url', 'id', 'title', 'category'],
        });
    }
    async remove(id) {
        return await Page_entity_1.default.delete({
            id: id,
        });
    }
    async getCategories() {
        const categories = ['Боксы', 'Информация', 'Контакты'];
        return categories;
    }
    async getByUrl(url) {
        return await Page_entity_1.default.findOne({
            where: {
                url: url,
            },
        });
    }
};
PagesService = __decorate([
    common_1.Injectable()
], PagesService);
exports.default = PagesService;
//# sourceMappingURL=pages.service.js.map