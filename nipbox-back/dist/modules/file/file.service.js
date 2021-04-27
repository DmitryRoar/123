"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const sharp = require("sharp");
let FileService = class FileService {
    saveFile(fileName, type, file) {
        const dir = path_1.resolve(__dirname, '../../../static/' + type + `/${fileName}`);
        sharp(file.buffer)
            .resize(400, 359)
            .toFile(dir, (err) => {
            if (err)
                console.error(err);
        });
    }
};
FileService = __decorate([
    common_1.Injectable()
], FileService);
exports.default = FileService;
//# sourceMappingURL=file.service.js.map