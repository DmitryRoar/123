"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let SeoConfigService = class SeoConfigService {
    async editConfig(dto) {
        fs_1.writeFileSync(path_1.resolve(__dirname, '../../../page.config.json'), JSON.stringify(dto));
        return true;
    }
    async getConfig() {
        const data = JSON.parse(fs_1.readFileSync(path_1.resolve(__dirname, '../../../page.config.json')).toString());
        console.log(data);
        return data;
    }
};
SeoConfigService = __decorate([
    common_1.Injectable()
], SeoConfigService);
exports.default = SeoConfigService;
//# sourceMappingURL=seo-config.service.js.map