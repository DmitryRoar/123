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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../common/guards/auth.guard");
const app_config_service_1 = require("./app-config.service");
const edit_app_config_dto_1 = require("./dto/edit-app-config.dto");
let AppConfigController = class AppConfigController {
    constructor(appConfigService) {
        this.appConfigService = appConfigService;
    }
    getConfig() {
        return this.appConfigService.getConfig();
    }
    editConfig(dto) {
        return this.appConfigService.editConfig(dto);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppConfigController.prototype, "getConfig", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_app_config_dto_1.default]),
    __metadata("design:returntype", void 0)
], AppConfigController.prototype, "editConfig", null);
AppConfigController = __decorate([
    common_1.Controller('config'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [app_config_service_1.default])
], AppConfigController);
exports.default = AppConfigController;
//# sourceMappingURL=app-config.controller.js.map