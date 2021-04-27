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
const Purchase_entity_1 = require("./Purchase.entity");
const ShopItem_entity_1 = require("./ShopItem.entity");
let CartItemEntity = class CartItemEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", String)
], CartItemEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ShopItem_entity_1.default, (s) => s.cartItems, { eager: true }),
    __metadata("design:type", ShopItem_entity_1.default)
], CartItemEntity.prototype, "item", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Purchase_entity_1.default, (p) => p.items),
    __metadata("design:type", Purchase_entity_1.default)
], CartItemEntity.prototype, "purchase", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CartItemEntity.prototype, "amount", void 0);
CartItemEntity = __decorate([
    typeorm_1.Entity()
], CartItemEntity);
exports.default = CartItemEntity;
//# sourceMappingURL=CartItem.entity.js.map