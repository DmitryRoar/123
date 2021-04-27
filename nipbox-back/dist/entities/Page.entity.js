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
exports.TextContent = void 0;
const typeorm_1 = require("typeorm");
class TextContent {
}
exports.TextContent = TextContent;
let PageEntity = class PageEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", String)
], PageEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PageEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", TextContent)
], PageEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PageEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PageEntity.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], PageEntity.prototype, "seoDesc", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], PageEntity.prototype, "seoTags", void 0);
PageEntity = __decorate([
    typeorm_1.Entity()
], PageEntity);
exports.default = PageEntity;
//# sourceMappingURL=Page.entity.js.map