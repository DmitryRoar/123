"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const User_entity_1 = require("../../entities/User.entity");
let AuthService = class AuthService {
    async login(data) {
        const user = await User_entity_1.default.findOne({
            where: {
                username: data.name,
                password: data.password
            },
        });
        if (user) {
            return user;
        }
        else {
            return false;
        }
    }
    async changePassword(old, newPass) {
        console.log(old, newPass);
        const user = await User_entity_1.default.findOne({
            where: {
                password: old,
            },
        });
        if (!user)
            return {
                err: 'Старый пароль - неверен',
            };
        user.password = newPass;
        await user.save();
        return true;
    }
};
AuthService = __decorate([
    common_1.Injectable()
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map