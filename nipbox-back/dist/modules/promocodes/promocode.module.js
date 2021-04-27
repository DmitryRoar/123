"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const promocode_controller_1 = require("./promocode.controller");
const promocodes_service_1 = require("./promocodes.service");
let PromocodeModule = class PromocodeModule {
};
PromocodeModule = __decorate([
    common_1.Module({
        controllers: [promocode_controller_1.default],
        providers: [auth_service_1.default, promocodes_service_1.default]
    })
], PromocodeModule);
exports.default = PromocodeModule;
//# sourceMappingURL=promocode.module.js.map