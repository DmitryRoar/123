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
const order_create_dto_1 = require("./dto/order-create.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async verify(req, res) {
        console.log(req.body);
        await this.orderService.validateOrder(req);
        res.status(200).send('ok');
    }
    async createOrder(dto) {
        return await this.orderService.createOrder(dto);
    }
    async getAll() {
        return await this.orderService.findAll();
    }
    async sendTracks(body) {
        this.orderService.sendTracks(body.email, body.tracks);
        return true;
    }
    async getById(id) {
        return await this.orderService.getById(id);
    }
    async verifyAdm(id, req) {
        return await this.orderService.validateOrder(req, id);
    }
    async setStatus(status, id) {
        return await this.orderService.setStatus(status, id);
    }
};
__decorate([
    common_1.Post('verify'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "verify", null);
__decorate([
    common_1.Post('create'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_create_dto_1.default]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Post('/send-tracks'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "sendTracks", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getById", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('/verify/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "verifyAdm", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    common_1.Get('/status/:id/:status'),
    __param(0, common_1.Param('status')), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "setStatus", null);
OrderController = __decorate([
    common_1.Controller('order'),
    __metadata("design:paramtypes", [order_service_1.default])
], OrderController);
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map