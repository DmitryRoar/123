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
let PurchaseEntity = class PurchaseEntity extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.created_at = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'bigint' }),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(() => CartItem_entity_1.default, (ci) => ci.purchase, { eager: true }),
    __metadata("design:type", Array)
], PurchaseEntity.prototype, "items", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "paymentId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "index", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "adress", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "sum", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PurchaseEntity.prototype, "deliverySum", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "deliveryType", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "trafic", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PurchaseEntity.prototype, "independenceKey", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", Date)
], PurchaseEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'boolean' }),
    __metadata("design:type", Boolean)
], PurchaseEntity.prototype, "xls", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'json' }),
    __metadata("design:type", Array)
], PurchaseEntity.prototype, "bxb", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'json' }),
    __metadata("design:type", Array)
], PurchaseEntity.prototype, "sdek", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'json' }),
    __metadata("design:type", Object)
], PurchaseEntity.prototype, "promocode", void 0);
PurchaseEntity = __decorate([
    typeorm_1.Entity()
], PurchaseEntity);
exports.default = PurchaseEntity;
//# sourceMappingURL=Purchase.entity.js.map