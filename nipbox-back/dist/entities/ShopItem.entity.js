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
const typeorm_1 = require("typeorm");
const CartItem_entity_1 = require("./CartItem.entity");
let ShopItemEntity = class ShopItemEntity extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.media = {
            closed: '',
            imgs: [],
            opened: '',
        };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "desc", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "seoDesc", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "seoTags", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "amountDesc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "order", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], ShopItemEntity.prototype, "hidden", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "mini", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "weight", void 0);
__decorate([
    typeorm_1.Column({ type: 'json' }),
    __metadata("design:type", Object)
], ShopItemEntity.prototype, "media", void 0);
__decorate([
    typeorm_1.OneToMany(() => CartItem_entity_1.default, (ci) => ci.item),
    __metadata("design:type", Array)
], ShopItemEntity.prototype, "cartItems", void 0);
__decorate([
    typeorm_1.Column({ default: 10 }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "height", void 0);
__decorate([
    typeorm_1.Column({ default: 25 }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "length", void 0);
__decorate([
    typeorm_1.Column({ default: 17 }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "width", void 0);
ShopItemEntity = __decorate([
    typeorm_1.Entity()
], ShopItemEntity);
exports.default = ShopItemEntity;
//# sourceMappingURL=ShopItem.entity.js.map