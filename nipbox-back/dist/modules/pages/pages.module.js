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
const pages_controller_1 = require("./pages.controller");
const pages_service_1 = require("./pages.service");
let PageModule = class PageModule {
};
PageModule = __decorate([
    common_1.Module({
        controllers: [pages_controller_1.default],
        providers: [pages_service_1.default, auth_service_1.default]
    })
], PageModule);
exports.default = PageModule;
//# sourceMappingURL=pages.module.js.map