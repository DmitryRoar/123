"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Promocode_entity_1 = require("../../entities/Promocode.entity");
let PromocodesService = class PromocodesService {
    async findByName(name) {
        return await Promocode_entity_1.default.findOne({
            where: {
                codeName: name,
            },
        });
    }
    async create(name, precentage) {
        const promocode = new Promocode_entity_1.default();
        promocode.codeName = name;
        promocode.precentage = precentage;
        await promocode.save();
        return true;
    }
    async all() {
        return await Promocode_entity_1.default.find();
    }
    async remove(id) {
        await Promocode_entity_1.default.delete({
            id: id,
        });
        return true;
    }
};
PromocodesService = __decorate([
    common_1.Injectable()
], PromocodesService);
exports.default = PromocodesService;
//# sourceMappingURL=promocodes.service.js.map